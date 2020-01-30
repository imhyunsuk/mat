import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import dynamic from "next/dynamic";
import MapContainer from '../containers/MapContainer'
import MobileContainer from "../containers/MobileContainer";
import Main from "../layout/Main"
import "bootstrap/dist/css/bootstrap.css"

const Home = () => {
  // const [isMobile, setisMobile] = useState(true);
  // useEffect(()=> {
  //   setisMobile(isMobileDevice());
  // }, [])

  return (  
    <div>
      <Head>
        <title>Home</title>
      </Head>
      <Main >
        <MapContainer/>
      </Main>
      <style jsx>{`
      `}</style>
    </div>
  );
}

export default Home


// Home.getInitialProps = async ({ req }) => {
//   const userAgent = req ? req.headers["user-agent"] : navigator.userAgent;
//   return { userAgent };
// };

// function detectmob() {
//   if (
//     navigator.userAgent.match(/Android/i) ||
//     navigator.userAgent.match(/webOS/i) ||
//     navigator.userAgent.match(/iPhone/i) ||
//     navigator.userAgent.match(/iPad/i) ||
//     navigator.userAgent.match(/iPod/i) ||
//     navigator.userAgent.match(/BlackBerry/i) ||
//     navigator.userAgent.match(/Windows Phone/i)
//   ) {
//     return true;
//   } else {
//     return false;
//   }
// }

// function detectmob() {
//   if (window.innerWidth <= 800 && window.innerHeight <= 600) {
//     return true;
//   } else {
//     return false;
//   }
// }

// 오직 컴포넌트에만
// const isMobileDevice = dynamic(() => import("../lib/mobile-detect"), {
//   ssr: false
// });
