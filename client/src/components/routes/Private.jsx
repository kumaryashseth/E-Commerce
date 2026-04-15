import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Outlet, Navigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";

const Private = () => {
  const [ok, setOk] = useState(false);
  const [auth] = useAuth();

console.log("AUTH:", auth);
  useEffect(() => {
    const authCheck = async () => {
      try {
        const res = await axios.get("/user-auth", {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        });
        console.log(res.data);
        setOk(res.data.ok);
      } catch (error) {
        setOk(false);
      }
    };

    if (auth?.token) {
      authCheck();
    }
  }, [auth?.token]);

  if (!auth?.token) return <Navigate to="/login" />;

  return ok ? <Outlet /> : <Spinner />;
};

export default Private;
