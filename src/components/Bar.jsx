import React from "react";
import { useNavigate } from "react-router-dom";

const Bar = ({ heading, isHomePage }) => {
  const navigate = useNavigate();
  return (
    <div className="w-full h-fit px-2 py-3 bg-slate-400 flex  items-center">
      {/*button to Go to the Homepage */}
      {!isHomePage && (
        <button
          className="bg-black/10 p-2"
          onClick={() => {
            navigate("/");
          }}
        >
        Back
        </button>
      )}

      <h2 className="mx-2 font-bold text-lg uppercase ">{heading}</h2>
    </div>
  );
};

export default Bar;
