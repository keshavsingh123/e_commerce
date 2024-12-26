import React, { useState } from "react";
import { toast } from "react-toastify";

import Layout from "../../Components/Layout/Layout";
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name, email, password, phone, address);
    toast.success("registered");
  };
  return (
    <Layout title={"register KS-COM"}>
      <div className="register">
        <h1 className="text-center">Register</h1>
        <form onSubmit={handleSubmit}>
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
            <label htmlFor="exampleInputEmail1">Email address</label>
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
              placeholder="Password"
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
              placeholder="Phone"
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
              placeholder="Address"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary mt-2 text-center">
            Submit
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
