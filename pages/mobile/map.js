import React, { useEffect, useState, createContext } from "react";
import Head from "next/head";
import { withAuthSync, auth } from "../../lib/auth";
import MobileLayout from "../../layout/MobileLayout";
import { SearchNav } from "../../components/Nav";
import MobileContainer from "../../containers/MobileContainer";
import Cookies from "js-cookie";
import Router from "next/router";
import { MapProvider } from "../../lib/context";


const MobileMap = ({ user_id }) => {
  const token = Cookies.get("token");
  
  useEffect(() => {
    if (!token) Router.push("/mobile/login");
  }, []);

  return (
    <div>
      <Head>
        <title>맛집 지도</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MapProvider>
        <MobileLayout>
          <SearchNav />
          <MobileContainer />
        </MobileLayout>
      </MapProvider>

      <style global jsx>{``}</style>
    </div>
  );
};

MobileMap.getInitialProps = ({ user_id }) => {
  return { user_id }
}

export default withAuthSync(MobileMap);
