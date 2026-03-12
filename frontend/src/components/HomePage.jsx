import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import MessageContainer from "./MessageContainer";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const { authUser } = useSelector((store) => store.user);

  useEffect(() => {
    if (!authUser) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-500/20 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10 p-6">
      <Sidebar />
      <MessageContainer />
    </div>
  );
};

export default HomePage;
