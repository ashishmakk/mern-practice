import React from 'react'
import customFetch from '../utils/customFetch';


export const loader = async ({ params }) => {

  try {
     
    const {data} = await customFetch.get(`/jobs/${params.id}`)
    
    const {job} = data;

    console.log(job);
    
    
    return null;
  } catch (error) {
    return error
  }

}


function EditJob() {



  return (
    <div>

    </div>
  )
}

export default EditJob