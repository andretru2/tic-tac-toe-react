import React from "react";

const Square = ({ value, onClick }) => {
  return (
    <div
      className=" h-16 grid place-content-center bg-blue-900 text-white text-center border-teal-300 border self-stretch cursor-pointer font-bold"
      type="button"
      onClick={onClick}
    >
      {value}
    </div>
  );
};

export default Square;
