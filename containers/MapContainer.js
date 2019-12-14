import React, { useState, useEffect, useRef } from "react";
import Map from "../components/Map";

import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { StoreAddButton } from "../components/Buttons";
import StoreList from "../components/StoreList";
import StoreAddModal from "../components/StoreAddModal";
import Search from "../components/Search";


const GET_MYRATINGS = gql`
  query {
    myRatings {
      id
      store {
        id
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
  const { loading, error, data, refetch } = useQuery(GET_MYRATINGS);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const initialMount = useRef(true);
  const [query, setQuery] = useState("");
  const onChange = e => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    if(initialMount.current){
      initialMount.current = false
    } else {
      modal ? null : refetch()
    }
  }, [modal])

  if (loading) return (<p>Loading...</p>);
  if (error) return (<p>`Error! ${error.message}`</p>);

  return (
    <div>
      <div className="left-side">
        <Map ratings={data.myRatings} mobile={false} />
      </div>
      <div className="right-side">
        <Search query={query} onChange={onChange} />
        <StoreList query={query} ratings={data.myRatings} />
      </div>
      <StoreAddButton onClick={toggle} />
      <StoreAddModal ratings={data.myRatings} modal={modal} toggle={toggle} />

      <style jsx>{`
        .left-side {
          float: left;
          width: 70%;
          height: 100vh;
          padding: 3px;
        }

        .right-side {
          width: 30%;
          height: 100vh;
          float: left;
          overflow: auto;
          background-color: white;
        }
      `}</style>
    </div>
  );

};

export default MapContainer;