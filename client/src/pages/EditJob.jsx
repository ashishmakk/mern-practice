import React from 'react'
import customFetch from '../utils/customFetch';
import { Form, redirect, useLoaderData } from 'react-router-dom';
import { FormRow, FormRowSelect } from '../components';
import { jobStatusArray, jobTypeArray } from '../utils/constants';
import { toast } from 'react-toastify';


export const loader = async ({ params }) => {

  try {
    const {data} = await customFetch.get(`/jobs/${params.id}`)
   
    return data;
  } catch (error) {

   toast.error(error?.response?.data?.msg)
    return redirect('../all-jobs')
  }
}

export const action = async ({params, request}) => {
  
  const formData = await request.formData(); 
  const data = await Object.fromEntries(formData); 

  try {
   await customFetch.patch(`/jobs/${params.id}`, data);
   
   toast.success('Job updated successfully');
   return redirect('../all-jobs');
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return redirect('../all-jobs');
  }

}

function EditJob() {
   
  const {job} = useLoaderData(); 
    console.log(job);
    
  return (<section>
     <Form method='post' >
      <h2>Update Job</h2>
      <div className='grid  md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6'>
      <FormRow name='company' type='text' defaultValue={job.company} />
      <FormRow name='position' type='text' defaultValue={job.position} />
      <FormRow name='jobLocation' labelText='location' type='text' defaultValue={job.jobLocation} />
      <FormRowSelect name="jobType" labelText="Job Type" data={jobTypeArray} defaultValue={job.jobType} />
      <FormRowSelect name='jobStatus' labelText='Job Status' data={jobStatusArray} defaultValue={job.jobStatus} />
      </div>
      <button type='submit' className='form-btn w-40 mt-5'>submit</button>
     </Form>
    </section>
  )
}

export default EditJob;

