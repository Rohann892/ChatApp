import React from "react";
import { IoMdArrowDroprightCircle } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";

const SendInput = () => {
  return (
    <form action="" className="px-4 my-3">
      <div className="flex justify-between items-center w-full relative">
        <input
          type="text"
          placeholder="send a message"
          className="border text-md rounded-lg block w-full bg-gray-400 p-3"
        />
        <button className="absolute inset-y-0 end-0 pr-4">
          <IoMdArrowDroprightCircle className="w-10 h-10 rounded-full" />
        </button>
      </div>
    </form>
  );
};

export default SendInput;
