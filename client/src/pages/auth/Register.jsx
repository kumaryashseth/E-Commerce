import React, { useState } from "react";
import Layout from "../../components/Layout";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const navigate=useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(name, email, password);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/register`,
        { name, email, password },
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate('/login');
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went Wrong");
    }
  };

  return (
    <Layout>
      <div className="register">
        <h1>Register</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputName" className="form-label">
              Name
            </label>
            <div id="NameHelp" className="form-text">
              We'll never share your Name with anyone else.
            </div>
            <input
              type="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              id="exampleInputName1"
              aria-describedby="NameHelp"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputemail1" className="form-label">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputemail1"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
