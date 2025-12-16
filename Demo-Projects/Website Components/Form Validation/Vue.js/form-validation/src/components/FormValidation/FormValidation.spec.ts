import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import FormValidation from './FormValidation.vue'

describe('FormValidation (Vue)', () => {
  it('renders and is invalid initially (submit disabled)', () => {
    const wrapper = mount(FormValidation)
    const button = wrapper.get('#form_button')
    expect((button.element as HTMLButtonElement).disabled).toBe(true)
  })

  it('shows errors on invalid submit', async () => {
    const wrapper = mount(FormValidation)
    await wrapper.get('form').trigger('submit.prevent')
    expect(wrapper.html()).toContain('Name is required')
    expect(wrapper.html()).toContain('Email is required')
  })

  it('password mismatch error appears', async () => {
    const wrapper = mount(FormValidation)
    await wrapper.get('#form_pass').setValue('abc12345')
    await wrapper.get('#form_pass_c').setValue('abc1234x')
    // blur to mark as touched
    await wrapper.get('#form_pass_c').trigger('blur')
    expect(wrapper.html().toLowerCase()).toContain('passwords do not match')
  })

  it('submits when valid', async () => {
    const wrapper = mount(FormValidation)
    await wrapper.get('#form_name').setValue('John Doe')
    await wrapper.get('#form_email').setValue('john@example.com')
    await wrapper.get('#form_number').setValue('1234567890')
    await wrapper.get('#form_pass').setValue('abc12345')
    await wrapper.get('#form_pass_c').setValue('abc12345')
    const button = wrapper.get('#form_button')
    expect((button.element as HTMLButtonElement).disabled).toBe(false)
    await wrapper.get('form').trigger('submit.prevent')
    expect(wrapper.html()).toContain('Form Submitted')
  })
})
