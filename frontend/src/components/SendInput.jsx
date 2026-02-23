import React, { useState } from "react";
import { IoMdArrowDroprightCircle } from "react-icons/io";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addMessages } from "../redux/messageSlice";

const SendInput = () => {
  const [message, setMessage] = useState("");
  const { selectedUser } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:8000/api/v1/message/send/${selectedUser._id}`,
        { message },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );
      console.log("Full Response data:", res.data);
      console.log("Sender ID in response:", res.data.senderId);
      dispatch(addMessages(res.data));
      setMessage("");
      console.log("Response", res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="px-4 my-3">
      <div className="flex justify-between items-center w-full relative">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          type="text"
          placeholder="send a message"
          className="border text-md rounded-lg block w-full bg-gray-400 p-3 text-base text-black"
        />
        <button type="submit" className="absolute inset-y-0 end-0 pr-4">
          <IoMdArrowDroprightCircle className="w-10 h-10 rounded-full" />
        </button>
      </div>
    </form>
  );
};

export default SendInput;
