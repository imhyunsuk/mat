import React from "react";
import Head from "next/head";
import LoginForm from "../components/LoginForm"
import "bootstrap/dist/css/bootstrap.css";
import Main from "../layout/Main";

const Login = () => (
  <div>
    <Head>
      <title>Login</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Main>
      <LoginForm />
    </Main>
    <style jsx>{``}</style>
  </div>
);

export default Login;
