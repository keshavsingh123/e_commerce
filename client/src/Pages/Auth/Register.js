import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../../Components/Layout/Layout";
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("api/v1/auth/register", {
        name,
        email,
        password,
        phone,
        address,
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
    <Layout title={"register KS-COM"}>
      <div className="register">
        <form className="form" onSubmit={handleSubmit}>
          <h4 className="text-center ">Register</h4>

          <div className="form-group">
            <label htmlFor="exampleInputName">Name</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="exampleInputName"
              placeholder="Enter name"
              required
            />
          </div>
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="exampleInputPassword1"
              placeholder="Enter Password"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPhone">Phone</label>
            <input
              type="number"
              className="form-control"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              id="exampleInputPhone"
              placeholder="Enter Phone"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputAddress">Address</label>
            <input
              type="text"
              className="form-control"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              id="exampleInputAddress"
              placeholder="Enter Address"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputAddress">Sport</label>
            <input
              type="text"
              className="form-control"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              id="exampleInputAnswer"
              placeholder="Enter your favourite sport name"
              required
            />
          </div>
          <div className="d-grid gap-2 mb-2">
            <button
              className="btn btn-warning"
              type="submit"
              onClick={() => navigate("/forget-password")}
            >
              Forget Password
            </button>
          </div>
          <div className="d-grid gap-2">
            <button className="btn btn-success" type="submit">
              Register
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
