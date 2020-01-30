import React, {useEffect} from "react";
import Head from "next/head";
import LoginForm from "../../components/LoginForm"
import MobileLayout from "../../layout/MobileLayout";
import Router from 'next/router';
import Cookies from 'js-cookie';
import { Nav } from "../../components/Nav";

const Login = () => {
  const title = "로그인";
  const token = Cookies.get("token");

  useEffect(() => {
    if(token) Router.push('/mobilemap')
  }, [])

  return (
    <div>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MobileLayout>
        <Nav title={title}/>
        <div className="center">
          <LoginForm />
        </div>
      </MobileLayout>
      <style jsx>{`
        .center {
          margin: 5% auto;
        }
      `}</style>
    </div>
  );
}

export default Login;
