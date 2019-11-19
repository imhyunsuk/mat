import React, { useEffect } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  ListGroup,
} from "reactstrap";
import Store from './Store';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";


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

const StoreList = props => {
  useEffect(() => {
  }, []);

  return (
    <aside>
      <ListGroup>
        {stores.map((store) => 
          <Store name={store.name} 
            score={store.score} 
            address={store.address}
            key={store.id} />)}
      </ListGroup>
      <style jsx>
        {`
          aside {
            width: 30%;
            height: 100vh;
            float: left;
            overflow: auto;
          }
        `}
      </style>
    </aside>
  );
};

export default StoreList;
