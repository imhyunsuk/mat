import React from 'react'
import Head from 'next/head'
import Navigation from '../components/Nav'
import Map from '../components/Map'
import StoreList from '../components/StoreList'
import { RoundButton } from '../components/Buttons'
import "bootstrap/dist/css/bootstrap.css"

const stores = [
  {
    name: "청년회관",
    address: "서울시 종로구 3가",
    score: 4,
    lat: 33.450936,
    lng: 126.569477
  },
  {
    name: "서관면옥",
    address: "서울시 관악구 신림동 516",
    score: 3,
    lat: 33.450705,
    lng: 126.570677
  }
];

const Home = () => (
  <div>
    <Head>
      <title>Home</title>
      <link rel="icon" href="/favicon.ico" />
      <script src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=e578390e4c8a647956df1b2ab5843257"/>
    </Head>

    <Navigation />
    <Map stores={stores}/>
    <StoreList />
    <RoundButton />

    <style jsx>{`

    `}</style>
  </div>
);

export default Home
