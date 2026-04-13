import React from "react";
import Layout from "../components/Layout";
import { useAuth } from "../context/AuthContext";

const HomePage = () => {
  const {auth, setAuth} = useAuth();
  return (
    <Layout>
      <h1>Home Page</h1>
      <pre>{JSON.stringify(auth)}</pre>
    </Layout>
  );
};

export default HomePage;
