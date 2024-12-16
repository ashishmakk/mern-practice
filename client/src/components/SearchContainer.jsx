import React from "react";
import { Form } from "react-router-dom";
import FormRow from "./FormRow";
import FormRowSelect from "./FormRowSelect";
import { jobStatusArray, jobTypeArray, sortArray } from "../utils/constants";
import customFetch from "../utils/customFetch";

export const action = ({request}) => {
  
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    const response = await customFetch.get('/jobs', searchObj);
  
    return null; 
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error; 
  }

}


function SearchContainer() {


  return (
    <section>
      <Form method='post'>
        <h4 className='font-medium'>search jobs</h4>
        <div className='grid  md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6'>
          <FormRow name='search' type='search' />
          <FormRowSelect
            data={jobStatusArray}
            labelText='Job status'
            name='jobStatus'
            defaultValue='interview'
          />
          <FormRowSelect
            data={jobTypeArray}
            labelText='Job type'
            name='jobType'
            defaultValue='full-time'
          />
          <FormRowSelect
            data={sortArray}
            labelText='Sort'
            name='sort'
            defaultValue='newest'
          />
        </div>
        <button type='submit' className='form-btn w-40 mt-5'>
          Submit
        </button>
      </Form>
    </section>
  );
}

export default SearchContainer;
