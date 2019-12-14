import React, { useState, useRef } from "react";
import {
  ListGroup
} from "reactstrap";
import Store from "./Store";


const StoreAddList = ({ ratings, stores, setStores }) => {
  return (
    <div>
      <ListGroup>
        {stores
          ? stores.map((store, index) => (
            <Store
              key={index}
              name={store.place_name}
              address={store.address_name}
              category={store.category_name}
              latitude={store.y}
              longitude={store.x}
              score={store.score}
              />
            ))
          : null}
      </ListGroup>
      <style jsx>
        {`
          a {
            color: black;
          }
        `}
      </style>
    </div>
  );
};

export default StoreAddList;
