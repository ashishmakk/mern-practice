import React from "react";
import { Form, Link, useSubmit } from "react-router-dom";
import FormRow from "./FormRow";
import FormRowSelect from "./FormRowSelect";
import { jobStatusArray, jobTypeArray, sortArray } from "../utils/constants";
import customFetch from "../utils/customFetch";

function SearchContainer() {
  const submit = useSubmit();

  return (
    <section>
      <Form>
        <h4 className='font-medium'>search jobs</h4>
        <div className='grid  md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6'>
          <FormRow
            name='search'
            type='search'
            defaultValue=''
            onChange={(e) => {
              return submit(e.currentTarget.form);
            }}
          />
          <FormRowSelect
            data={["all", ...jobStatusArray]}
            labelText='Job status'
            name='jobStatus'
            defaultValue='all'
            onChange={(e) => {
              return submit(e.currentTarget.form);
            }}
          />
          <FormRowSelect
            data={["all", ...jobTypeArray]}
            labelText='Job type'
            name='jobType'
            defaultValue='all'
            onChange={(e) => {
              return submit(e.currentTarget.form);
            }}
          />
          <FormRowSelect
            data={sortArray}
            labelText='Sort'
            name='sort'
            defaultValue='newest'
            onChange={(e) => {
              return submit(e.currentTarget.form);
            }}
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
