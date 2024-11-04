import React from "react";
import Card from "react-bootstrap/Card";
import "../css/WarehouseCard.css";
import { Link } from "react-router-dom";


const WarehouseCard = (props) => {
  return (
    <div>
      <Card  id="curd">
        
        <Card.Body   id="badycurd">
          <Card.Title id="Title"> {props.name} </Card.Title>
          <Card.Text >id : {props.id}</Card.Text>

          <Card.Text>{props.location}</Card.Text>
          <Card.Text>{props.status}</Card.Text>

          
        </Card.Body>
        
      </Card>
    </div>
  );
};



export default WarehouseCard;