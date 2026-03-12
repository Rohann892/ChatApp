import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import OtherUsers from "./otherUsers";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser, setOnlineUser, setOtherUsers } from "../redux/userSlice";
import { setMessages } from "../redux/messageSlice";

const Sidebar = () => {
  const [search, setSearch] = useState();

  const { otherUsers } = useSelector((store) => store.user);

  const dispatch = useDispatch();

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    const conversationUser = otherUsers?.find((user) =>
      user.fullName.toLowerCase().includes(search.toLowerCase()),
    );
    if (conversationUser) {
      dispatch(setOtherUsers([conversationUser]));
    } else {
      toast.error("user not found");
    }
  };

  const navigate = useNavigate();
  const Logouthandler = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/v1/user/logout`);
      console.log("Response", res);
      if (res.status === 201 || res.status === 200) {
        toast.success(res.data.message || "Signup successful!");
        setTimeout(() => navigate("/login"), 1000);
        dispatch(setAuthUser(null));
        dispatch(setOtherUsers(null));
        dispatch(setOnlineUser([]));
        dispatch(setMessages([]));
      }
    } catch (error) {
      console.log(error);
    }
    dispatch(setAuthUser(null));
    console.log("logout succsssfully");
  };

  return (
    <div className="border-r border-slate-500/40 px-4 flex flex-col h-full overflow-y-auto">
      <form onSubmit={searchSubmitHandler} className="flex items-center gap-2">
        <input
          value={search}
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered rounded-md border bg-white/10 text-gray-900 outline-none"
          placeholder="search...."
        />
        <button
          type="submit"
          className="btn bg-zinc-500 border-0 outline-none hover:bg-zinc-600 hover:scale-100"
        >
          <FaSearch className="w-5 h-5" />
        </button>
        <div className="divider px-3"></div>
      </form>
      <div>
        <OtherUsers />
      </div>
      <div className="mt-3">
        <button onClick={Logouthandler} className="btn btn-sm">
          LogOut
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
