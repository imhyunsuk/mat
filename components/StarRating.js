import React, { useState, useEffect, useRef, forwardRef } from "react";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";


const Star = ({ selected = false, onClick = f => f }) => (
  <div className={selected ? "star selected" : "star"} onClick={onClick}>
    <style jsx>
      {`
        .star {
          cursor: pointer;
          position: relative;
          width: 1.2rem;
          height: 1.2rem;
          backgroun: black;
          background-color: rgb(203, 211, 227);

          -webkit-clip-path: polygon(
            50% 0%,
            63% 38%,
            100% 38%,
            69% 59%,
            82% 100%,
            50% 75%,
            18% 100%,
            31% 59%,
            0% 38%,
            37% 38%
          );
          clip-path: polygon(
            50% 0%,
            63% 38%,
            100% 38%,
            69% 59%,
            82% 100%,
            50% 75%,
            18% 100%,
            31% 59%,
            0% 38%,
            37% 38%
          );
        }

        .star.selected {
          background-color: #ffb400;
          z-index: 1;
        }
      `}
    </style>
  </div>
);


const StarRating = forwardRef(({ totalStars, starNumber, setStarNumber, ratingId }, ref) => {

  useEffect(() => {
    ref.current=starNumber
  }, [starNumber])

  return (
    <div className="star-rating">
      {[...Array(totalStars)].map((n, i) => (
        <Star
          key={i}
          selected={i < starNumber}
          onClick={() => setStarNumber(i+1)}
        />
      ))}
      <style jsx>
        {`
          .star-rating {
            display: flex;
            flex-wrap: wrap;
          }
        `}
      </style>
    </div>
  );
});

export default StarRating
