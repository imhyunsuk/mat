import React from "react";
import Head from "next/head";
import MapContainer from "../containers/MapContainer";
import { withAuthSync } from "../lib/auth";
import "bootstrap/dist/css/bootstrap.css";

const MyMap = () => (
  <div>
    <Head>
      <title>My Map</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <MapContainer />

    <style jsx>{``}</style>
  </div>
);

export default withAuthSync(MyMap);
