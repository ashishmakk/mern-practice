import React from "react";
import {
  Form,
  redirect,
  useNavigation,
  useOutletContext,
} from "react-router-dom";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { FormRow, FormRowSelect } from "../components";
import { jobStatusArray, jobTypeArray } from "../utils/constants";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  console.log(data);

  try {
    await customFetch.post("/jobs", data);
    toast.success("Job created successfully");
    return null;
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    console.log(error);

    return error;
  }
};

function AddJob() {
  const { user } = useOutletContext();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <section>
      <Form method='post'>
        <h2>Add Job</h2>
        <div className='grid  md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6'>
          <FormRow name='company' type='text' />
          <FormRow name='position' type='text' />
          <FormRow name='jobLocation' type='text' labelText='location' />
          <FormRowSelect
            name='jobStatus'
            labelText='Status'
            data={jobStatusArray}
            defaultValue='pending'
          />
          <FormRowSelect
            name='jobType'
            labelText='Type'
            data={jobTypeArray}
            defaultValue='full-time'
          />
        </div>
        <button
          type='submit'
          className='form-btn w-40 mt-5'
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting" : "Submit"}
        </button>
      </Form>
    </section>
  );
}

export default AddJob;
