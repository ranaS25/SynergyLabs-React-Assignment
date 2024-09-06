import React from 'react'
import UserPage from '../UserPage'


// Custom Input Field for UserPage
const LabeledInput = ({ label, placeholder="not mentioned", value, name, isDisabled, onChange}) => {
  return (
    <div className="pb-3 w-full">
      <div className="flex flex-col gap-2 w-full">
        <label className=" text-black/70 font-semibold pl-2">{ label}</label>
        <input
          type="text"
          className="border rounded p-2 w-full"
          placeholder={ placeholder}
          disabled={isDisabled}
          name={ name}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
}

export default LabeledInput