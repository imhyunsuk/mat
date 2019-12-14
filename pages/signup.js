import React from "react";
import Head from "next/head";
import SignupForm from "../components/SignupForm";
import "bootstrap/dist/css/bootstrap.css";

const Signup = () => (
  <div>
    <Head>
      <title>가입하기</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <SignupForm />

    <style jsx>{``}</style>
  </div>
);

export default Signup;
