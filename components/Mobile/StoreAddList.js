import React, {useEffect} from "react";
import { ListGroup, Alert, Container } from "reactstrap";
import Store from '../Store';

const StoreAddList = ({ stores, overlay }) => {

  return (
    <div>
      {stores.length > 0
        ? ( <ListGroup>
            { 
              stores.map((store, index) => (
                <Store
                  key={index}
                  name={store.place_name}
                  address={store.address_name}
                  category={store.category_name}
                  latitude={store.y}
                  longitude={store.x}
                  score={store.score}
                  overlay={overlay}
                /> 
              ))
            }
          </ListGroup> )
        : <Container fluid>
            <Alert color="info" className='my-3'>
            <h5 className="alert-heading"><strong>가게를 검색하세요 ! </strong></h5>
            <p>가게를 찾고 리스트에 추가하세요</p>
            </Alert>
          </Container> }
      
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
  )
};

export default StoreAddList;
