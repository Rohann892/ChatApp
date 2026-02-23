import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Signup = () => {
  const [user, setUser] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const navigate = useNavigate();
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:8000/api/v1/user/register`,
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
        setTimeout(() => navigate("/login"), 1500);
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

  const handleCheckbox = (gender) => {
    setUser({ ...user, gender });
  };
  return (
    <div className="min-w-96 mx-aut0">
      <div className="h-full w-full bg-gray-500/20 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10 border border-gray-100 p-6">
        <h1 className="text-3xl font-bold text-center text-gray-900/80">
          Sign up
        </h1>
        <form onSubmit={onSubmitHandler} className="flex flex-col space-y-3">
          <div>
            <div>
              <label htmlFor="fullname" className="label p-2">
                <span className="text-base label-text font-bold text-black/70">
                  Full Name
                </span>
              </label>
              <input
                value={user.fullName}
                onChange={(e) => setUser({ ...user, fullName: e.target.value })}
                type="text"
                className="w-full input input-bordered h-10 outline-none p-2 border border-gray-100 bg-white/10"
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <label htmlFor="username" className="label p-2">
                <span className="text-base label-text font-bold text-black/70">
                  Username
                </span>
              </label>
              <input
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                type="text"
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
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                type="password"
                className="w-full input input-bordered h-10 outline-none p-2 border border-gray-100 bg-white/10"
                placeholder="Enter your password"
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="label p-2">
                <span className="text-base label-text font-bold text-black/70">
                  Confirm Password
                </span>
              </label>
              <input
                value={user.confirmPassword}
                onChange={(e) =>
                  setUser({ ...user, confirmPassword: e.target.value })
                }
                type="password"
                className="w-full input input-bordered h-10 outline-none p-2 border border-gray-100 bg-white/10"
                placeholder="Enter your confirm password"
              />
            </div>
            <div className="flex items-center my-4 gap-3">
              <div className="flex items-center">
                <p>Male</p>
                <input
                  type="checkbox"
                  className="checkbox mx-2"
                  checked={user.gender === "male"}
                  onChange={() => handleCheckbox("male")}
                />
              </div>
              <div className="flex items-center">
                <p>Female</p>
                <input
                  type="checkbox"
                  className="checkbox mx-2"
                  checked={user.gender === "female"}
                  onChange={() => handleCheckbox("female")}
                />
              </div>
            </div>
            <Link to="/login" className="text-center gap-2">
              <p>
                Already have an account{" "}
                <span className="text-blue-600 hover:underline">login</span>
              </p>
            </Link>
            <div>
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-200 disabled:opacity-50"
              >
                SignUp
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
