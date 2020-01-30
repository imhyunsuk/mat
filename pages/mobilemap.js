import React, { useEffect } from "react";
import Head from "next/head";
import { withAuthSync, auth } from "../lib/auth";
import nextCookie from 'next-cookies'
import MobileLayout from "../layout/MobileLayout";
import MobileContainer from "../containers/MobileContainer";
import Router from 'next/router';
import Cookies from 'js-cookie';


const MobileMap = () => {
  const title = '내 리스트';
  const token = Cookies.get("token");

  useEffect(() => {
    if(!token) Router.push('/mobile/login')
  }, [])

  return (
    <div>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MobileLayout title={title}>
        <MobileContainer />
      </MobileLayout>

      <style global jsx>{`
      `}</style>

    </div>
  );
}

// MobileMap.getInitialProps = async ctx => {
//   const { token } = nextCookie(ctx)
// }
export default withAuthSync(MobileMap);
