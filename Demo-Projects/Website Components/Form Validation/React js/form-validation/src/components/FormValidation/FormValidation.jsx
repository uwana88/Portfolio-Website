import React, { useMemo, useState } from 'react';
import './FormValidation.css';

const NAME_REGEX = /^[a-zA-Z\s]+$/;
const PHONE_REGEX = /^\d{10,}$/;
const PASS_REGEX  = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

const initialValues = { name: '', email: '', number: '', pass: '', pass_c: '' };

function validate(values) {
  const errors = {};

  if (!values.name) errors.name = 'Name is required.';
  else if (!NAME_REGEX.test(values.name)) errors.name = 'Letters and spaces only.';

  if (!values.email) errors.email = 'Email is required.';
  else {
    // Simple email validation
    const ok = /^\S+@\S+\.\S+$/.test(values.email);
    if (!ok) errors.email = 'Enter a valid email.';
  }

  if (!values.number) errors.number = 'Phone number is required.';
  else if (!PHONE_REGEX.test(values.number)) errors.number = 'Digits only, min 10.';

  if (!values.pass) errors.pass = 'Password is required.';
  else if (!PASS_REGEX.test(values.pass)) errors.pass = 'At least 8 characters, include letters and numbers.';

  if (!values.pass_c) errors.pass_c = 'Please confirm your password.';

  if (values.pass && values.pass_c && values.pass !== values.pass_c) {
    errors.passwordsDontMatch = 'Passwords do not match.';
  }

  return errors;
}

export default function FormValidation() {
  const [values, setValues] = useState(initialValues);
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const errors = useMemo(() => validate(values), [values]);
  const isValid = useMemo(() => Object.keys(errors).length === 0, [errors]);

  function handleChange(e) {
    const { name, value } = e.target;
    setValues(v => ({ ...v, [name]: value }));
  }

  function handleBlur(e) {
    const { name } = e.target;
    setTouched(t => ({ ...t, [name]: true }));
  }

  function markAllTouched() {
    setTouched({ name: true, email: true, number: true, pass: true, pass_c: true });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!isValid) { markAllTouched(); setSubmitted(false); return; }
    setSubmitted(true);
  }

  function closeMessage() {
    setSubmitted(false);
    setValues(initialValues);
    setTouched({});
  }

  return (
    <section>
      <div className="form">
        <form onSubmit={handleSubmit} noValidate>
          <h2 id="textEditor_title">Form Validation</h2>

          <label htmlFor="form_name">Name</label>
          <input
            id="form_name"
            name="name"
            type="text"
            placeholder="Name *"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={!!(touched.name && errors.name)}
          />
          {touched.name && errors.name && <small className="error">{errors.name}</small>}

          <label htmlFor="form_email">Email</label>
          <input
            id="form_email"
            name="email"
            type="email"
            placeholder="Email *"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={!!(touched.email && errors.email)}
          />
          {touched.email && errors.email && <small className="error">{errors.email}</small>}

          <label htmlFor="form_number">Phone Number</label>
          <input
            id="form_number"
            name="number"
            type="tel"
            placeholder="Phone Number *"
            value={values.number}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={!!(touched.number && errors.number)}
          />
          {touched.number && errors.number && <small className="error">{errors.number}</small>}

          <label htmlFor="form_pass">Password</label>
          <input
            id="form_pass"
            name="pass"
            type="password"
            placeholder="Password *"
            value={values.pass}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={!!(touched.pass && errors.pass)}
          />
          {touched.pass && errors.pass && <small className="error">{errors.pass}</small>}

          <label htmlFor="form_pass_c">Confirm Password</label>
          <input
            id="form_pass_c"
            name="pass_c"
            type="password"
            placeholder="Confirm Password *"
            value={values.pass_c}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={!!(touched.pass_c && (errors.pass_c || errors.passwordsDontMatch))}
          />
          {(touched.pass_c && errors.pass_c) && <small className="error">{errors.pass_c}</small>}
          {(touched.pass || touched.pass_c) && errors.passwordsDontMatch && (
            <small className="error">{errors.passwordsDontMatch}</small>
          )}

          <button id="form_button" type="submit" disabled={!isValid}>Send Message</button>
        </form>

        {submitted && (
          <div id="submit_message">
            <h2>Form Submitted</h2>
            <p>
              Thank you for completing this form. This is for testing purposes; your
              information will not be saved.
            </p>
            <button onClick={closeMessage}>Close</button>
          </div>
        )}
      </div>
    </section>
  );
}
