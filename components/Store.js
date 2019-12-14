import React, { useState, useEffect, useRef } from "react";
import { ListGroupItem } from "reactstrap";
import StarRating from  '../components/StarRating';
import { gql } from "apollo-boost";
import { useLazyQuery, useMutation } from "@apollo/react-hooks";


const CHANGE_RATING = gql`
  mutation ChangeRating($ratingId: ID, $storeName: String, $storeAddress: String, $score: Int!) {
    changeRating(ratingId: $ratingId, storeName: $storeName, storeAddress: $storeAddress, score: $score) {
      id
      score
    }
  }
`;

const ADD_RATING = gql`
  mutation AddRating(
    $storeName: String!,
    $storeLatitude: Float!,
    $storeLongitude: Float!,
    $storeAddress: String!,
    $storeDescription: String,
    $score: Int!
  ) {
    addRating(
      storeName: $storeName,
      storeLatitude: $storeLatitude,
      storeLongitude: $storeLongitude,
      storeAddress: $storeAddress,
      storeDescription: $storeDescription
      score: $score
    ) {
      id
      score
    }
  }
`;

const FIND_RATING = gql`
  mutation FindRatingID(
    $storeName: String!
    $storeAddress: String!
  ) {
    findRatingID(
      storeName: $storeName
      storeAddress: $storeAddress
    ) {
      id
    }
  }
`;


const Store = ({name, score, address, ratingId, category, latitude, longitude }) => {

  const [starNumber, setStarNumber] = useState(score);
  const starRatingRef = useRef();
  const [
    changeRating,
  ] = useMutation(CHANGE_RATING);
  const [
    addRating,
    { loading: mutationLoading, error: mutationError }
  ] = useMutation(ADD_RATING);
  const [ findRatingID, { loading, data }] = useMutation(FIND_RATING);
  
  useEffect(() => {
    if (!ratingId && starRatingRef.current !== score ) {
      changeRating({
        variables: {
          storeName: name,
          storeAddress: address,
          score: starNumber
        }
      })
      .then(res => {
        console.log(`Change ratingId to score ${starNumber}`);
      })
      .catch(err => {
        console.log(err);
      });
    }

    if (!!ratingId && starRatingRef.current !== score) {
      changeRating({
        variables: {
          ratingId: ratingId,
          score: starNumber
        }
      })
      .then(res => {
        console.log(`Change ratingId to score ${starNumber}`);
      })
      .catch(err => {
        console.log(err);
      });
    }

    if (!ratingId && score === 0 && starRatingRef.current !== 0) {
      addRating({
        variables: {
          storeName: name,
          storeLatitude: parseFloat(latitude),
          storeLongitude: parseFloat(longitude),
          storeAddress: address,
          score: starNumber
        }
      })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          alert(err);
        });
    }
  }, [starNumber]);

  return (
    <ListGroupItem>
      {/* {mutationLoading && <p>{changeRating.error}</p>}
      {mutationError && <p>{changeRating.error}</p>} */}
      <div className="row">
        <div href="#" className="col-12">
          <div>
            <strong className="float-left">{name}</strong>
            <span className="float-right">
              {
                <StarRating
                  totalStars={5}
                  starNumber={starNumber}
                  setStarNumber={setStarNumber}
                  ratingId={ratingId}
                  ref={starRatingRef}
                />
              }
            </span>
          </div>
          <div className="clearfix" />
          <div>{address}</div>
        </div>
      </div>

      <style jsx>{`
        strong {
          color: #006eee;
        }

        a {
          color: black;
        }
      `}</style>
    </ListGroupItem>
  );
};

Store.defaultProps = {
  score : 0,
}

export default Store;
