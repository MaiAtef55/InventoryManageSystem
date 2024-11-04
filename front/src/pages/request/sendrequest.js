import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import axios from "axios";

import { useParams } from "react-router-dom";   
const Sendrequest = () => {
  const storedObject = JSON.parse(localStorage.getItem("user"));
  let { id } = useParams();
  const [request, setrequest] = useState({
    quantity: "",
    warehouseid: storedObject.Warehouseid,
    supervisorid: storedObject.id,
    productid: id,
    loading: false,
    err: [],
    success: null,
  });

  const requestFun = (e) => {
    e.preventDefault();
    setrequest({ ...request, loading: true, err: [] });
    axios
      .post("http://localhost:4000/stockrequest", {
        warehouseid: request.warehouseid,
        quantity: request.quantity,
        requestid: request.warehouseid,
        productid: request.productid,
        supervisorid: request.supervisorid,
      })
      .then((resp) => {
        setrequest({
          ...request,
          loading: false,
          err: [],
          success: "request Created Successfully !",
        });
      })
      .catch((errors) => {
        setrequest({
          ...request,
          loading: false,
          success: null,
          err: errors.response.data.errors,
        });
      });
  };

  return (
    <div className="login-container">
      <h1>Send request</h1>

      {request.err?.map((error, index) => (
        <Alert key={index} variant="danger" className="p-2">
          {error.msg}
        </Alert>
      ))}
      {request.success && (
        <Alert variant="success" className="p-2">
          {request.success}
        </Alert>
      )}

      <Form onSubmit={requestFun}>
        <Form.Group className="mb-3">
          <Form.Control
            type="quantity"
            placeholder="quantity"
            value={request.quantity}
            onChange={(e) =>
              setrequest({ ...request, quantity: e.target.value })
            }
          />
        </Form.Group>
       

        <Button
          className="btn btn-dark w-100"
          variant="primary"
          type="submit"
          disabled={request.loading === true}
        >
          Send request
        </Button>
      </Form>
    </div>
  );
};

export default Sendrequest;
