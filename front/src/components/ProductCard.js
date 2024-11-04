import React from "react";
import Card from "react-bootstrap/Card";

import "../css/ProductCard.css";
import { Link } from "react-router-dom";
const ProductCard = (props) => {
  return (
    <div id="Card">
      <Card>
        <Card.Img id="Img" src={props.image} />
        <Card.Body id="curd">
          <Card.Title>{props.name} </Card.Title>
          <Card.Text>id :{props.id}</Card.Text>
          <Card.Text>{props.description}</Card.Text>
          <Card.Text>stock: {props.stock}</Card.Text>
          
        </Card.Body>
        <Link id="btn" className="btn btn-dark w-100" to={"/sendrequest/" + props.id}>
            send request
          </Link>
      </Card>
    </div>
  );
};

export default ProductCard;
