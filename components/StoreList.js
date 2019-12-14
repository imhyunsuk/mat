import React, { useState } from "react";
import { ListGroup } from "reactstrap";
import Store from './Store';
import Search from './Search';


const StoreList = ({query, ratings}) => {
  const lowercasedFilter = query.toLowerCase();
  const filteredData = ratings.filter(rating =>
    rating.store.name.toLowerCase().includes(lowercasedFilter)
  );

  return (
    <div>
      <ListGroup>
        {filteredData.map(({ id, store, score }) => (
          <Store
            key={id}
            name={store.name}
            score={score}
            address={store.address}
            ratingId={id}
            latitude={store.latitude}
            longitude={store.longitude}
          />
        ))}
      </ListGroup>
      <style jsx>
        {`
          a{
            color: black;
          }
        `}
      </style>
    </div>
  );
};

export default StoreList;
