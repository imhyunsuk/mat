import React, { useState, useEffect } from "react";
import { gql } from "apollo-boost";
import { Modal, ModalHeader, ModalBody, Form } from "reactstrap";
import SearchMap from "../components/SearchMap";
import StoreAddList from "./StoreAddList";
import Search from "../components/Search";


const StoreAddModal = (props) => {
  const {modal, toggle} = props;
  const [stores, setStores] = useState([]);
  const [query, setQuery] = useState("");

  const onChange = e => setQuery(e.target.value);
  const onClick = () => {
    const fetchStores = async () => {
      const res = await fetch(
        encodeURI(
          `https://dapi.kakao.com/v2/local/search/keyword.json?query=${query}&category_group_code=FD6,CE7`
        ),
        {
          headers: {
            Authorization: `KakaoAK ${process.env.KAKAO_SECRET}`
          }
        }
      );
      const data = await res.json();
      setStores(data.documents);
    };

    if (query) fetchStores();
  };

  const filteredData = stores.map((store, idx) => {
    let rating = props.ratings.find(rating => {
      console.log(rating.store.latitude, parseFloat(store.y))
      return (
        rating.store.name == store.place_name &&
        rating.store.address == store.address_name
      );
    });
    return rating ? { ...store, score: rating.score } : store;
  });

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle} size="xl">
        <ModalHeader toggle={toggle}>장소 추가</ModalHeader>
        <ModalBody>
          <div className="left-side">
            <SearchMap stores={stores} />
          </div>
          <div className="right-side">
            <Search query={query} onChange={onChange} onClick={onClick} />
            <StoreAddList
              ratings={props.ratings}
              stores={filteredData}
              setStores={setStores}
            />
          </div>
        </ModalBody>
      </Modal>

      <style jsx>{`
        .full-width {
          width: 100%;
          height: 100%;
        }

        .left-side {
          float: left;
          width: 70%;
          height: 100vh;
          padding: 3px;
        }

        .right-side {
          width: 30%;
          height: 80vh;
          float: left;
          overflow: auto;
        }
      `}</style>
    </div>
  );
};

//can't use getinitialprops in child component
// StoreAddModal.getInitialProps = async function(context) {
  
// };


export default StoreAddModal;