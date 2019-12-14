import React from 'react'
import Head from 'next/head'
import MapContainer from '../containers/MapContainer'
import "bootstrap/dist/css/bootstrap.css"

const Home = () => (
  <div>
    <Head>
      <title>Home</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <MapContainer />

    <style jsx>{`

    `}</style>
  </div>
);

export default Home
