import { Form, redirect, useActionData, useNavigate, useNavigation } from "react-router-dom";
import { FormRow } from "../components";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";


export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const errors = { msg: "" };

  if (data.password.length < 6) {
    errors.msg = "Password must be of at least 6 characters";
    return errors;
  }

  try {
    await customFetch.post("/auth/login", data);
    toast.success("Login successful");
    return redirect("/dashboard");
  } catch (error) {
    errors.msg = error?.response?.data?.msg;
    return errors;
  }
};

function Login() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const navigate = useNavigate()
  const actionData = useActionData();

  const loginTestUser = async () => {
    const testUser = { email: "test@gmail.com", password: "secret" };

    try {
      await customFetch.post("/auth/login", testUser);
      toast.success('Login successful')
      return navigate("/dashboard");
    } catch (error) {
      toast.error(error?.response?.data?.msg)
    }
  };

  return (
    <section className='alignment my-20'>
      <Form
        method='post'
        className='flex flex-col gap-y-4 shadow-2xl p-8 justify-center mx-auto md:w-96'
      >
        <h2 className='text-center mb-4'>Login</h2>
        {actionData?.msg && (
          <p
            style={{
              color: "red",
              textAlign: "center",
              marginBottom: "0.5rem",
            }}
          >
            {actionData.msg}
          </p>
        )}
        <FormRow type='email' name='email' labelText='your email' />
        <FormRow type='password' name='password' labelText='password' />
        <button type='submit' className='btn mt-2' disabled={isSubmitting}>
          {isSubmitting ? "Submitting" : "Submit"}
        </button>
        <button type='button' className='btn mt-2' onClick={loginTestUser}>
          Explore the app
        </button>
      </Form>
    </section>
  );
}

export default Login;
