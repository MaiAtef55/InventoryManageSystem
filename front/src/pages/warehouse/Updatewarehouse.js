import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";   
const Updatewarehouse = () => {
    let { id } = useParams();
  const navigate = useNavigate();
  const [warehouse, setwarehouse] = useState({
    status: "",
    location: "",
    name: "",
    loading: false,
    err: [],
    success: null,
  });

  const warehouseFun = (e) => {
    e.preventDefault();
    setwarehouse({ ...warehouse, loading: true, err: [] });
    axios
      .put(`http://localhost:4000/warehouses/${id}`, {
        name: warehouse.name,
        status: warehouse.status,
        location: warehouse.location,
      })
      .then((resp) => {
        setwarehouse({ ...warehouse, loading: false, err: [], success: "Warehouse updated successfully!" });
      })
      .catch((errors) => {
        setwarehouse({
          ...warehouse,
          loading: false,
          success: null,
          err: errors.response.data.errors,
        });
      });
  };
  

  return (
    <div className="login-container">
      <h1>Update warehouse </h1>

      {warehouse.err?.map((error, index) => (
        <Alert key={index} variant="danger" className="p-2">
          {error.msg}
        </Alert>
      ))}
      {warehouse.success && (
        <Alert variant="success" className="p-2">
          {warehouse.success}
        </Alert>
      )}

      <Form onSubmit={warehouseFun}>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Full Name"
            value={warehouse.name}
            onChange={(e) =>
              setwarehouse({ ...warehouse, name: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            type="status"
            placeholder="status"
            value={warehouse.status}
            onChange={(e) =>
              setwarehouse({ ...warehouse, status: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            type="location"
            placeholder="location"
            value={warehouse.location}
            onChange={(e) =>
              setwarehouse({ ...warehouse, location: e.target.value })
            }
          />
        </Form.Group>

        <Button
          className="btn btn-dark w-100"
          variant="primary"
          type="submit"
          disabled={warehouse.loading === true}
        >
          Update warehouse
        </Button>
      </Form>
    </div>
  );
};

export default Updatewarehouse;
