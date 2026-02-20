import React from "react";
import { setSelectedUser } from "../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";

const OtherUser = ({ user }) => {
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((store) => store.user);
  const selectedUserHandler = () => {
    dispatch(setSelectedUser(user));
  };
  return (
    <>
      <div
        onClick={selectedUserHandler}
        className={`${selectedUser?._id === user?._id ? "bg-white/40 text-black" : ""} flex gap-2 items-center hover:bg-zinc-200/30 rounded-md p-2 cursor-pointer`}
      >
        <div className="avatar avatar-online">
          <div>
            <img
              src={user?.profilePhoto}
              alt=""
              className="w-12 rounded-full"
            />
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex gap-2">
            <p>{user?.fullName}</p>
          </div>
        </div>
      </div>
      <div className="divider my-0 py-0 h-1"></div>
    </>
  );
};

export default OtherUser;
