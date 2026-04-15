import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Spinner = () => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Spinner mounted");

    const timer = setTimeout(() => {
      console.log("Redirecting now...");
      navigate("/login");
    }, 10000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100">
      
      <div className="spinner-border text-primary" role="status"></div>

      <h4 className="mt-3">Please wait... Redirecting</h4>
    </div>
  );
};

export default Spinner;