import React, { useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Search = ({ query, onChange, onClick }) => {

  const pressEnter = e => {
    if(e.keyCode==13) onClick();
  };
  const searchInput = useRef(null);
  useEffect(() => {
    searchInput.current.focus();
  }, [])

  return (
    <div className="inline">
      <div className="inside">
        <input
          type="text"
          value={query}
          placeholder="장소 검색..."
          onChange={onChange}
          onKeyDown={pressEnter}
          ref={searchInput}
        />
        <button type="button" className="icon float-right" onClick={onClick}>
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
      <style jsx>
        {`
          .inline {
            width: 90%;
            height: 36px;
            margin: 10px auto 10px;
            border: 1px solid #dddddd;
            border-radius: 24px;
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
