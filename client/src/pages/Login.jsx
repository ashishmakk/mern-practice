import React from "react";
import { FormRow } from "../components";

function Login() {
  return (
    <section className='alignment my-20'>
      <form className='flex flex-col gap-y-4 shadow-2xl p-8 justify-center mx-auto md:w-96'>
        <h2 className='text-center mb-4'>Login</h2>
        <FormRow type='email' name='email' labelText='your email' />
        <FormRow type='password' name='password' labelText='password' />
        <button type='submit' className='btn mt-2'>
          Submit
        </button>
        <button type='button' className='btn mt-2'>
          Explore the app
        </button>
      </form>
    </section>
  );
}

export default Login;
