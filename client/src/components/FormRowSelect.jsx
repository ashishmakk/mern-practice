import React from "react";

function FormRowSelect({ name, labelText, defaultValue = "", data }) {
  return (
    <div className='flex flex-col gap-y-2'>
      <label htmlFor={name}>{labelText || name}</label>
      <select
        name={name}
        id={name}
        defaultValue={defaultValue}
        className='border-2 border-[#e4e4e4] outline-none 
     p-3 rounded-md capitalize'
      >
        {data.map((type) => {
          return (
            <option key={type} value={type}>
              {type}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default FormRowSelect;
