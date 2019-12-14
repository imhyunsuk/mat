import React, { useState } from "react";
import Map from "../components/Map";

import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { StoreAddButton } from "../components/Buttons";
import StoreList from "../components/StoreList";
import StoreAddModal from "../components/StoreAddModal";

const GET_MYRATINGS = gql`
  query {
    ratings {
      store {
        name
        address
        latitude
        longitude
      }
      score
    }
  }
`;

const MapContainer = () => {
  //   const { loading, error, data } = useQuery(GET_MYRATINGS);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>`Error! ${error.message}`</p>;

  return (
    <div>
      <Map ratings={data.ratings} mobile={true} />
      <StoreList ratings={data.ratings} />
      <StoreAddButton onClick={toggle} />
      <StoreAddModal modal={modal} toggle={toggle} />

      <style jsx>{``}</style>
    </div>
  );
};

export default MapContainer;
