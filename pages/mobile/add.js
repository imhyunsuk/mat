import React, { useEffect } from "react";
import Head from "next/head";
import { withAuthSync, auth } from "../../lib/auth";
import MobileLayout from "../../layout/MobileLayout";
import AddContainer from "../../containers/AddContainer";
import { SearchNav } from "../../components/Nav";
import Router from "next/router";
import Cookies from "js-cookie";
import { AddProvider } from "../../lib/context"

const AddStore = () => {
  const token = Cookies.get("token");

  useEffect(() => {
    if (!token) Router.push("/mobile/login");
  }, []);

  return (
    <div>
      <Head>
        <title>맛집 추가</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AddProvider>
        <MobileLayout>
          <SearchNav />
          <AddContainer />
        </MobileLayout>
      </AddProvider>

      <style global jsx>{``}</style>
    </div>
  );
};

export default withAuthSync(AddStore);
