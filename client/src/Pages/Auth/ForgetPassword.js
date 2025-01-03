import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../../Components/Layout/Layout";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setnewPassword] = useState("");
  const [answer, setAnswer] = useState("");

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("api/v1/auth/forget-password", {
        email,
        newPassword,
        answer,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Layout title={"login KS-COM"}>
      <div className="login">
        <form className="form" onSubmit={handleSubmit}>
          <h4 className="text-center ">Reset Password</h4>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="exampleInputEmail1"
              placeholder="Enter email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              value={newPassword}
              onChange={(e) => setnewPassword(e.target.value)}
              id="exampleInputPassword1"
              placeholder="Password"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Answer</label>
            <input
              type="text"
              className="form-control"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              id="exampleInputAnswer"
              placeholder="Enter Sport Name"
              required
            />
          </div>
          <div className="d-grid gap-2">
            <button className="btn btn-primary" type="submit">
              Reset
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default ForgetPassword;
