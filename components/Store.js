import React, { useEffect } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  ListGroupItem
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const Store = ({name, score, address}) => {

  useEffect(() => {}, []);

  return (
    <div>
      <ListGroupItem>
        <div className="row">
          <div className="col-3">
            <img
              src="https://image.ibb.co/jw55Ex/def_face.jpg"
              className="img img-rounded img-fluid"
            />
          </div>
          <div className="col-9">
            <p>
              <a
                className="float-left"
                href="https://maniruzzaman-akash.blogspot.com/p/contact.html"
              >
                <strong>{name}</strong>
              </a>
              <span className="float-right">
                {[...Array(score)].map((e, i) => <FontAwesomeIcon icon={faStar} key={i} />)}
              </span>
            </p>
            <div className="clearfix"/>
            <p>{address}</p>
          </div>
        </div>
      </ListGroupItem>

      <style jsx>
        {`
        `}
      </style>
    </div>
  );
};

export default Store;
