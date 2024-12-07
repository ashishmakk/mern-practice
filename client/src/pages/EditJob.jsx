import React from 'react'
import customFetch from '../utils/customFetch';
import { Form, redirect, useLoaderData } from 'react-router-dom';
import { FormRow, FormRowSelect } from '../components';
import { jobTypeArray } from '../utils/constants';
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



export const action = async () => {

return null

}

function EditJob() {
   
  const {job} = useLoaderData(); 
    console.log(job);
    
  return (
    <section>
<h2>asdasd</h2>
    </section>
  )
}

export default EditJob;

