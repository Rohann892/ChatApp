import React from "react";
import Otheruser from "./Otheruser";
import useGetOtherUsers from "../hooks/UseGetOtherUsers";
import { useSelector } from "react-redux";

const OtherUsers = () => {
  // custom hook calling
  useGetOtherUsers();

  const { otherUsers } = useSelector((store) => store.user);
  if (!otherUsers) return; //early return in react
  return (
    <div className="overflow-auto flex-1">
      {otherUsers?.map((user) => {
        return <Otheruser user={user} key={user._id} />;
      })}
    </div>
  );
};

export default OtherUsers;
