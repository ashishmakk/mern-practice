import { Link, Form, redirect, useNavigation } from "react-router-dom";
import { FormRow } from "../components";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  console.log(data);

  try {
    await customFetch.post("/auth/register", data);
    toast.success("Registration successful");
    return redirect("/login");
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

function Register() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <section className='alignment my-20'>
      <Form
        method='post'
        className='flex flex-col gap-y-4 shadow-2xl p-8 justify-center mx-auto md:w-96'
      >
        <h2 className='text-center mb-4'>Register</h2>
        <FormRow
          labelText='first name'
          name='name'
          type='text'
          defaultValue='roger'
        />
        <FormRow
          labelText='last name'
          name='lastName'
          type='text'
          defaultValue='federer'
        />
        <FormRow
          labelText='location'
          name='location'
          type='text'
          defaultValue='switzerland'
        />
        <FormRow
          labelText='email'
          name='email'
          type='email'
          defaultValue='roger@gmail.com'
        />
        <FormRow
          labelText='password'
          name='password'
          type='password'
          defaultValue='secret'
        />
        <button type='submit' className='btn mt-2' disabled={isSubmitting}>
          {isSubmitting ? "submitting" : "submit"}
        </button>
        <p className='text-center mt-6'>Already a member?</p>
        <Link to='/login' className='btn btn-login text-center'>
          Login
        </Link>
      </Form>
    </section>
  );
}

export default Register;
