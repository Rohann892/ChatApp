import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../redux/userSlice";

const Login = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:8000/api/v1/user/login`,
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );
      if (res.status === 201 || res.status === 200) {
        toast.success(res.data.message || "Signup successful!");
        setTimeout(() => navigate("/"), 1500);
        dispatch(setAuthUser(res.data));
        console.log(res);
        console.log(res.data._id);
      }
    } catch (error) {
      console.log("Error:", error);
      if (error.response && error.response.data) {
        toast.error(error.response.data.message || "Signup failed");
      } else {
        toast.error("An error occurred. Please try again.");
      }
    }
  };
  return (
    <div className="min-w-96 mx-aut0">
      <div className="h-full w-full bg-gray-500/20 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10 border border-gray-100 p-6">
        <h1 className="text-3xl font-bold text-center text-gray-900/80">
          Login
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
          <div>
            <div>
              <label htmlFor="username" className="label p-2">
                <span className="text-base label-text font-bold text-black/70">
                  Username
                </span>
              </label>
              <input
                type="text"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                className="w-full input input-bordered h-10 outline-none p-2 border border-gray-100 bg-white/10"
                placeholder="Enter your username"
              />
            </div>
            <div>
              <label htmlFor="password" className="label p-2">
                <span className="text-base label-text font-bold text-black/70">
                  Password
                </span>
              </label>
              <input
                type="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                className="w-full input input-bordered h-10 outline-none p-2 border border-gray-100 bg-white/10"
                placeholder="Enter your password"
              />
            </div>
            <Link to="/register" className="text-center gap-2">
              <p>
                Don't have an account{" "}
                <span className="text-blue-600 hover:underline">SingUp</span>
              </p>
            </Link>
            <div>
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-200 disabled:opacity-50"
              >
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
