import React, { useEffect } from "react";
import Head from "next/head";
import { withAuthSync, auth } from "../../lib/auth";
import MobileLayout from "../../layout/MobileLayout";
import ShareForm from "../../components/ShareForm";
import { Nav } from "../../components/Nav";


const Share = () => {
  const title = "공유하기";

  return (
    <div>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MobileLayout title={title}>
        <Nav title="공유하기"/>
        <ShareForm />
      </MobileLayout>

      <style global jsx>{``}</style>
    </div>
  );
};

// MobileMap.getInitialProps = async ctx => {
//   const { token } = nextCookie(ctx)
// }
export default withAuthSync(Share);
