import React from "react";
import Head from "next/head";
import Navigation from "../components/Nav";
import LoginForm from "../components/LoginForm"
import "bootstrap/dist/css/bootstrap.css";

const Login = () => (
  <div>
    <Head>
      <title>Login</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <LoginForm />

    <style jsx>{``}</style>
  </div>
);

export default Login;
