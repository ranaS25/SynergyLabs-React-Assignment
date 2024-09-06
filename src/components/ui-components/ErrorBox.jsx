import React from 'react'

const ErrorBox = ({message}) => {
  return (
    <div className="w-fit mx-auto left-[50%] -translate-x-[50%] fixed top-0   p-4">
      <h2 className="px-6 w-fit mx-auto py-6 font-bold text-xl rounded-xl text-slate-50 bg-red-400 ">
        {message}
      </h2>
    </div>
  );
}

export default ErrorBox