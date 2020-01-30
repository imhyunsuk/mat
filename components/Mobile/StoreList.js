import React, { useContext, useEffect } from "react";
import { ListGroup } from "reactstrap";
import Store from '../Store';
import { useAppContext } from "../../lib/context";

const StoreList = ({ratings, overlay}) => {
  const { query, setQuery } = useAppContext()
  const lowercasedFilter = query.toString().toLowerCase();
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
            overlay={overlay}
          />
        ))}
      </ListGroup>
      <style jsx>
        {`
          div {
            border-top: solid #f7f7f7;
            height: 50vh;
            overflow: scroll;
          }
        `}
      </style>
    </div>
  );
};

export default StoreList;
