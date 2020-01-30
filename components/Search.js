import React, { useRef, useEffect, useContext, forwardRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useAppContext } from "../lib/context";
import { useRouter } from 'next/router';


const Search = () => {
  const { setQuery, searchClick } = useAppContext();
  const pressEnter = e => {
    if(e.keyCode==13) searchClick();
  };
  const onChange = e => {
    setQuery(e.target.value)
  }

  return (
    <div className="inline">
      <div className="inside">
        <input
          type="text"
          placeholder="장소 검색..."
          onChange={onChange}
          onKeyDown={pressEnter}
        />
        <button type="button" className="icon float-right" onClick={searchClick}>
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
      <style jsx>
        {`
          .inline {
            width: 88%;
            height: 36px;
            margin: 4px auto 4px;
            border: 1px solid #dddddd;
            border-radius: 8px;
            background-color: white;
          }

          .inside {
            padding: 5px 0 15px 15px;
          }

          input[type="text"] {
            height: 100%;
            width: auto;
            font-size: 1em;
            margin: 0 auto;
            border: 0;
            outline: 0;
            box-sizing: border-box;
            color: black;
          }

          input:focus + button {
            color: #006eee;
          }

          .icon {
            color: black;
            background: transparent;
            border: none;
            padding-right: 15px;
          }
        `}
      </style>
    </div>
  );
};

export default Search;
