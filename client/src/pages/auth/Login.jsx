import React, { useState } from 'react'
import Layout from '../../components/Layout';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");

      const navigate=useNavigate()

      const handleSubmit=async(e)=>{
        e.preventDefault()
        console.log(email,password);
        try {
            const res =await axios.post(`${import.meta.env.VITE_API_URL}/login`,{
                email,
                password
            });
            if(res.data.success){
                toast.success(res.data.message)
                navigate("/")
            }else{
                toast.error(res.data.mesage)
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong")
        }
        
      }
  return (
    <Layout>
          <div className="register">
            <h1>Login</h1>
    
            <form onSubmit={handleSubmit}>
              
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
      
  )
}

export default Login