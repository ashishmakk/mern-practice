import React from "react";
import { Link } from "react-router-dom";
import { FormRow } from "../components";

function Register() {
  return (
    <section className='alignment my-20'>
      <form className='flex flex-col gap-y-4 shadow-2xl p-8 justify-center mx-auto md:w-96'>
        <h2 className='text-center mb-4'>Register</h2>
        <FormRow
          labelText='first name'
          name='firstName'
          type='text'
          defaultValue='ashish'
        />
        <FormRow
          labelText='last name'
          name='lastName'
          type='text'
          defaultValue='makwana'
        />
        <FormRow
          labelText='location'
          name='location'
          type='text'
          defaultValue='earth'
        />
        <FormRow
          labelText='email'
          name='email'
          type='email'
          defaultValue='ashish@gmail.com'
        />
        <FormRow
          labelText='password'
          name='password'
          type='password'
          defaultValue='secret123'
        />
        <button type='submit' className='btn mt-2'>
          Submit
        </button>
        <p className='text-center mt-6'>Already a member?</p>
        <Link to='/login' className='btn btn-login text-center'>
          Login
        </Link>
      </form>
    </section>
  );
}

export default Register;
