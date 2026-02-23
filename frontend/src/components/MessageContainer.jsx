import React, { useEffect } from "react";

import SendInput from "./SendInput";
import Messages from "./Messages";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../redux/userSlice";

const MessageContainer = () => {
  const dispatch = useDispatch();
  const { selectedUser, authUser, onlineUsers } = useSelector(
    (store) => store.user,
  );

  const isOnline = onlineUsers.includes(selectedUser?._id);

  useEffect(() => {
    return () => {
      dispatch(setSelectedUser(null));
    };
  }, [dispatch]);
  return (
    <>
      {selectedUser ? (
        <div className="md:min-w-[550px] pl-4 flex flex-col h-full relative">
          <div className="flex gap-2 items-center bg-zinc-500 rounded-lg p-2 pl-4">
            <div className={`avatar ${isOnline ? "avatar-online" : ""}`}>
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
      ) : (
        <div className="md:min-w-[550px] flex flex-col justify-center items-center">
          <h1 className="text-bold text-4xl">Hi {authUser?.fullName}</h1>
          <p className="font-medium text-3xl">Lets Start Conversation</p>
        </div>
      )}
    </>
  );
};

export default MessageContainer;
