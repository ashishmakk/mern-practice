import React from "react";

function FormRow({ type, name, labelText, defaultValue }) {
  return (
    <div className='flex flex-col gap-y-2'>
      <label htmlFor={name} className=' capitalize'>
        {labelText || name}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        defaultValue={defaultValue || ""}
        required
        className='border-2 border-[#e4e4e4] outline-none p-3 rounded-md'
      />
    </div>
  );
}

export default FormRow;
