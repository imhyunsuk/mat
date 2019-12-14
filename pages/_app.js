import React from "react";
import App from "next/app";
import Navigation from "../components/Nav";
import Footer from "../components/Footer";
import { withApollo } from "../lib/apollo";
import Head from "next/head";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css"; // Import the CSS
config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically since it's being imported above

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    const kakaoMapSDK = "https://dapi.kakao.com/v2/maps/sdk.js?appkey=" + process.env.KAKAO_MAP_KEY

    return (
      <React.Fragment>
        <Head>
          <script src={kakaoMapSDK} />
        </Head>
        <Navigation />
        <Component {...pageProps} />
        <Footer />
      </React.Fragment>
    );
  }
}

export default withApollo(MyApp);
