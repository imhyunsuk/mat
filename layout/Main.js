import React from "react";
import Navigation from "../components/Nav";
import Footer from "../components/Footer";
import Head from "next/head";
import MapContainer from "../containers/MapContainer";


const Main = ({ children }) => {
  return (
    <React.Fragment>
      <Navigation />
      { children }
      <Footer />
    </React.Fragment>
  );
};

export default Main;
