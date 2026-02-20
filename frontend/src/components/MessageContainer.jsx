import React from "react";
import profile_img from "../assets/images/img.jpeg";
import SendInput from "./SendInput";
import Messages from "./Messages";
import { useSelector } from "react-redux";

const MessageContainer = () => {
  const { selectedUser } = useSelector((store) => store.user);
  if (!selectedUser) return;
  console.log(selectedUser);
  return (
    <div className="md:min-w-[550px] pl-4 flex flex-col h-full">
      <div className="flex gap-2 items-center bg-zinc-500 rounded-lg p-2 pl-4">
        <div className="avatar avatar-online">
          <div>
            <img
              src={selectedUser?.profilePhoto}
              alt=""
              className="w-12 rounded-full"
            />
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex gap-2">
            <p>{selectedUser?.fullName}</p>
          </div>
        </div>
      </div>
      <Messages />
      <SendInput />
    </div>
  );
};

export default MessageContainer;
