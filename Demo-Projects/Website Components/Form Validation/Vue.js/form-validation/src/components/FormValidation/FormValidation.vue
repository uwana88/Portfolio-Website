<template>
  <section>
    <div class="form">
      <form @submit.prevent="handleSubmit" novalidate>
        <h2 id="textEditor_title">Form Validation</h2>

        <label for="form_name">Name</label>
        <input
          id="form_name"
          v-model="values.name"
          name="name"
          type="text"
          placeholder="Name *"
          @blur="onBlur('name')"
          :aria-invalid="touched.name && !!errors.name"
        />
        <small v-if="touched.name && errors.name" class="error">{{ errors.name }}</small>

        <label for="form_email">Email</label>
        <input
          id="form_email"
          v-model="values.email"
          name="email"
          type="email"
          placeholder="Email *"
          @blur="onBlur('email')"
          :aria-invalid="touched.email && !!errors.email"
        />
        <small v-if="touched.email && errors.email" class="error">{{ errors.email }}</small>

        <label for="form_number">Phone Number</label>
        <input
          id="form_number"
          v-model="values.number"
          name="number"
          type="tel"
          placeholder="Phone Number *"
          @blur="onBlur('number')"
          :aria-invalid="touched.number && !!errors.number"
        />
        <small v-if="touched.number && errors.number" class="error">{{ errors.number }}</small>

        <label for="form_pass">Password</label>
        <input
          id="form_pass"
          v-model="values.pass"
          name="pass"
          type="password"
          placeholder="Password *"
          @blur="onBlur('pass')"
          :aria-invalid="touched.pass && !!errors.pass"
        />
        <small v-if="touched.pass && errors.pass" class="error">{{ errors.pass }}</small>

        <label for="form_pass_c">Confirm Password</label>
        <input
          id="form_pass_c"
          v-model="values.pass_c"
          name="pass_c"
          type="password"
          placeholder="Confirm Password *"
          @blur="onBlur('pass_c')"
          :aria-invalid="(touched.pass_c && (!!errors.pass_c || !!errors.passwordsDontMatch))"
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
          Thank you for completing this form. This is for testing purposes; your
          information will not be saved.
        </p>
        <button @click="closeMessage">Close</button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { reactive, computed, ref } from 'vue';

const NAME_REGEX = /^[a-zA-Z\s]+$/;
const PHONE_REGEX = /^\d{10,}$/;
const PASS_REGEX  = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

type Values = { name: string; email: string; number: string; pass: string; pass_c: string };
type Touched = Partial<Record<keyof Values, boolean>>;

const initialValues: Values = { name: '', email: '', number: '', pass: '', pass_c: '' };
const values = reactive<Values>({ ...initialValues });
const touched = reactive<Touched>({});
const submitted = ref(false);

function validate(v: Values) {
  const errors: Record<string, string> = {};

  if (!v.name) errors.name = 'Name is required.';
  else if (!NAME_REGEX.test(v.name)) errors.name = 'Letters and spaces only.';

  if (!v.email) errors.email = 'Email is required.';
  else if (!/\S+@\S+\.\S+/.test(v.email)) errors.email = 'Enter a valid email.';

  if (!v.number) errors.number = 'Phone number is required.';
  else if (!PHONE_REGEX.test(v.number)) errors.number = 'Digits only, min 10.';

  if (!v.pass) errors.pass = 'Password is required.';
  else if (!PASS_REGEX.test(v.pass)) errors.pass = 'At least 8 characters, include letters and numbers.';

  if (!v.pass_c) errors.pass_c = 'Please confirm your password.';

  if (v.pass && v.pass_c && v.pass !== v.pass_c) {
    errors.passwordsDontMatch = 'Passwords do not match.';
  }

  return errors;
}

const errors = computed(() => validate(values));
const isValid = computed(() => Object.keys(errors.value).length === 0);

function onBlur(field: keyof Values) {
  touched[field] = true;
}

function markAllTouched() {
  touched.name = true;
  touched.email = true;
  touched.number = true;
  touched.pass = true;
  touched.pass_c = true;
}

function handleSubmit() {
  if (!isValid.value) { markAllTouched(); submitted.value = false; return; }
  submitted.value = true;
}

function closeMessage() {
  submitted.value = false;
  Object.assign(values, initialValues);
  Object.keys(touched).forEach(k => delete (touched as any)[k]);
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
