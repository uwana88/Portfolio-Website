<template>
  <section>
    <div class="form">
      <form @submit.prevent="handleSubmit" novalidate>
        <h2 id="textEditor_title">Form Validation</h2>

        <label for="form_name">Name</label>
        <input
          id="form_name"
          v-model="values.name"
          @blur="touched.name = true"
          type="text"
          placeholder="Name *"
        />
        <small v-if="touched.name && errors.name" class="error">{{ errors.name }}</small>

        <label for="form_email">Email</label>
        <input
          id="form_email"
          v-model="values.email"
          @blur="touched.email = true"
          type="email"
          placeholder="Email *"
        />
        <small v-if="touched.email && errors.email" class="error">{{ errors.email }}</small>

        <label for="form_number">Phone Number</label>
        <input
          id="form_number"
          v-model="values.number"
          @blur="touched.number = true"
          type="tel"
          placeholder="Phone Number *"
        />
        <small v-if="touched.number && errors.number" class="error">{{ errors.number }}</small>

        <label for="form_pass">Password</label>
        <input
          id="form_pass"
          v-model="values.pass"
          @blur="touched.pass = true"
          type="password"
          placeholder="Password *"
        />
        <small v-if="touched.pass && errors.pass" class="error">{{ errors.pass }}</small>

        <label for="form_pass_c">Confirm Password</label>
        <input
          id="form_pass_c"
          v-model="values.pass_c"
          @blur="touched.pass_c = true"
          type="password"
          placeholder="Confirm Password *"
        />
        <small v-if="touched.pass_c && errors.pass_c" class="error">{{ errors.pass_c }}</small>
        <small v-if="(touched.pass || touched.pass_c) && errors.passwordsDontMatch" class="error">
          {{ errors.passwordsDontMatch }}
        </small>

        <button id="form_button" type="submit" :disabled="!isValid">Send Message</button>
      </form>

      <div id="submit_message" v-if="submitted">
        <h2>Form Submitted</h2>
        <p>
          Thank you for completing this form. This is for testing purposes; your information will not be saved.
        </p>
        <button @click="closeMessage">Close</button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { reactive, computed, ref } from 'vue';

const NAME_REGEX = /^[a-zA-Z\s]+$/;
const PHONE_REGEX = /^\d{10,}$/;
const PASS_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

const values = reactive({ name: '', email: '', number: '', pass: '', pass_c: '' });
const touched = reactive({});
const submitted = ref(false);

const errors = computed(() => {
  const errs = {};

  if (!values.name) errs.name = 'Name is required.';
  else if (!NAME_REGEX.test(values.name)) errs.name = 'Letters and spaces only.';

  if (!values.email) errs.email = 'Email is required.';
  else {
    const ok = /^\S+@\S+\.\S+$/.test(values.email);
    if (!ok) errs.email = 'Enter a valid email.';
  }

  if (!values.number) errs.number = 'Phone number is required.';
  else if (!PHONE_REGEX.test(values.number)) errs.number = 'Digits only, min 10.';

  if (!values.pass) errs.pass = 'Password is required.';
  else if (!PASS_REGEX.test(values.pass)) errs.pass = 'At least 8 characters, include letters and numbers.';

  if (!values.pass_c) errs.pass_c = 'Please confirm your password.';

  if (values.pass && values.pass_c && values.pass !== values.pass_c) {
    errs.passwordsDontMatch = 'Passwords do not match.';
  }

  return errs;
});

const isValid = computed(() => Object.keys(errors.value).length === 0);

function handleSubmit() {
  if (!isValid.value) {
    Object.keys(values).forEach(k => (touched[k] = true));
    submitted.value = false;
    return;
  }
  submitted.value = true;
}

function closeMessage() {
  submitted.value = false;
  Object.keys(values).forEach(k => (values[k] = ''));
  Object.keys(touched).forEach(k => (touched[k] = false));
}
</script>

<style scoped>
section { display: flex; justify-content: center; padding: 2rem; }
.form { width: 100%; max-width: 520px; }
form { display: flex; flex-direction: column; gap: .75rem; }
input { padding: .6rem .8rem; border: 1px solid #ccc; border-radius: 6px; }
button { margin-top: .5rem; padding: .7rem 1rem; border: 0; border-radius: 6px; background: #0d6efd; color: #fff; }
button:disabled { opacity: .5; cursor: not-allowed; }
.error { color: #c0392b; font-size: .85rem; }
#submit_message { margin-top: 1rem; padding: 1rem; border: 1px solid #e6e6e6; border-radius: 8px; background: #f8f9fa; }
</style>
