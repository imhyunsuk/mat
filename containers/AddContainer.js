import React, { createRef, useState, useEffect, useRef } from "react";
import SearchMap from "../components/SearchMap";

import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import StoreAddList from "../components/Mobile/StoreAddList";
import { useAppContext } from "../lib/context";
import Drawer from "../components/Drawer"

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

const initOverlay = () => {
  if (typeof window !== 'undefined') {
    const script = document.createElement('script');

    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.KAKAO_MAP_KEY}`;
    script.async = true;

    document.body.appendChild(script);

    return new kakao.maps.CustomOverlay({ xAnchor: 0.2, yAnchor: 0.5 });
  }
}

const AddContainer = () => {
  const { loading, error, data, refetch } = useQuery(GET_MYRATINGS);
  const [expanded, setExpanded] = useState(false)
  const { stores, setStores } = useAppContext();
  const [overlay, setOverlay] = useState(initOverlay)

  const mapClick = () => {
    setExpanded(false);
  };
  const drawerClick = () => {
    setExpanded(true);
  };

  const filteredData = stores.map((store, idx) => {
    let rating = data.myRatings.find(rating => {
        return (
            rating.store.name == store.place_name &&
            rating.store.address == store.address_name
        );
    });
    return rating ? { ...store, score: rating.score } : store;
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>`Error! ${error.message}`</p>;

  return (
    <div>
      <div className={expanded ? "expanded-map" : "map"} onClick={mapClick}>
        <SearchMap stores={stores} overlay={overlay}/>
      </div>
      <div
        className={expanded ? "expanded-drawer" : "drawer"}
        onClick={drawerClick}
      >
        <Drawer expanded={expanded}>
          <StoreAddList 
            ratings={data.myRatings}
            stores={filteredData}
            setStores={setStores}
            overlay={overlay}
          />
        </Drawer>
      </div>
    <style jsx>{`
    #kakaomap {
      height: 100%;
    }

    .expanded-map {
      height: 43vh;
      width: 100%;
    }

    .map {
      height: 65vh;
      width: 100%;
    }

    .expanded-drawer {
      height: 70vh;
      width: 100%;
    }

    .drawer {
      height: 30vh;
      width: 100%;
    }
  `}</style>
    </div>
  );
};

export default AddContainer;
