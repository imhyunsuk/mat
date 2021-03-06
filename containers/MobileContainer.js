import React, { useContext, useState, useEffect } from "react";
import Map from "../components/Map";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import StoreList from "../components/Mobile/StoreList";
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

const MobileContainer = () => {
  const { loading, error, data, refetch } = useQuery(GET_MYRATINGS);
  const [expanded, setExpanded] = useState(false)
  const [overlay, setOverlay] = useState(initOverlay)

  const mapClick = () => {
    setExpanded(false);
  };
  const drawerClick = () => {
    setExpanded(true);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>`Error! ${error.message}`</p>;

  return (
    <div>
      <div className={expanded ? "expanded-map" : "map"} onClick={mapClick}>
        <Map ratings={data.myRatings} overlay={overlay}/>
      </div>
      <div
        className={expanded ? "expanded-drawer" : "drawer"}
        onClick={drawerClick}
      >
        <Drawer expanded={expanded}>
          <StoreList ratings={data.myRatings} overlay={overlay}/>
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

export default MobileContainer;
