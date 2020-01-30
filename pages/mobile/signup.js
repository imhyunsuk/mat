import React from "react";
import Head from "next/head";
import MobileLayout from "../../layout/MobileLayout";
import SignupForm from "../../components/SignupForm";

const Signup = () => {
  const title = "가입하기";

  return (
    <div>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MobileLayout title={title}>
        <div className="center">
          <SignupForm />
        </div>
      </MobileLayout>
      
      <style jsx>{`
        .center {
          margin: 5% auto;
        }
      `}</style>
    </div>
  );
};

export default Signup;
