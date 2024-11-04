import React, { useState, useRef, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import axios from "axios";
// import { propTypes } from "react-bootstrap/esm/Image";

const Add = () => {
  const [warehouses, setWarehouses] = useState([]);
  useEffect(() => {
    // Fetch warehouses when component mounts
    axios
      .get("http://localhost:4000/warehouses")
      .then((response) => {
        setWarehouses(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [product, setProduct] = useState({
    name: "",
    description: "",
    stock: "",
    Warehouseid: "",
    err: "",
    loading: false,
    successMsg: "",
  });

  const image = useRef(null);

  const createProduct = (e) => {
    e.preventDefault();

    setProduct({ ...product, loading: true });

    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("stock", product.stock);
    formData.append("Warehouseid", product.Warehouseid);
    if (image.current.files && image.current.files[0]) {
      formData.append("image", image.current.files[0]);
    }

    axios
      .post("http://localhost:4000/prodect/", formData, {
        headers: {
          token: "",
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        setProduct({
          name: "",
          description: "",
          stock: "",
          Warehouseid: "",
          err: [],
          loading: false,
          successMsg: "Product Added Successfully !",
        });
        image.current.value = null;
      })
      .catch((err) => {
        setProduct({
          ...product,
          loading: false,
          successMsg: null,
          err: "Something Went Wronge !",
        });
      });
  };

  return (
    <div className="p-5 text-center" style={{ height: "100%" }}>
      <h2>Add New Product</h2>

      {product.err && (
        <Alert variant="danger" className="p-2">
          {product.err}
        </Alert>
      )}

      {product.successMsg && (
        <Alert variant="success" className="p-2">
          {product.successMsg}
        </Alert>
      )}

      <Form onSubmit={createProduct} style={{ textAlign: "center" }}>
        <Form.Group className="mb-3 p-2 text-center">
          <Form.Label>name</Form.Label>
          <Form.Control
            value={product.name}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
            type="text"
            placeholder="Product Name"
          />
        </Form.Group>

        {/* ///////////////////////////////////// */}

        <Form.Group className="mb-3 p-2 text-center">
          <Form.Label>description</Form.Label>
          <Form.Control
            value={product.description}
            onChange={(e) =>
              setProduct({ ...product, description: e.target.value })
            }
            type="text"
            placeholder="Product Description"
          />
        </Form.Group>

        {/* /////////////////////////////////// */}

        <Form.Group className="mb-3 p-2 text-center">
          <Form.Label>stock</Form.Label>
          <Form.Control
            value={product.stock}
            onChange={(e) => setProduct({ ...product, stock: e.target.value })}
            type="text"
            placeholder="Product Stock"
          />
        </Form.Group>
        {/* ///////////////////////////////////// */}

        <Form.Group className="mb-3 p-2 text-center">
          <Form.Label>Warehouse</Form.Label>
          <Form.Select
            value={product.Warehouseid}
            onChange={(e) =>
              setProduct({ ...product, Warehouseid: e.target.value })
            }
          >
            <option value="">Select Warehouse</option>
            {warehouses.map((warehouse) => (
              <option key={warehouse.id} value={warehouse.id}>
                {warehouse.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3 p-2 text-center">
          <Form.Label>image ``</Form.Label>
          {/* <Form.Control type="text" placeholder="Product img (file) "  /> */}
          <input
            type="file"
            className="fotm-control"
            ref={image}
            style={{
              border: "2px solid gray",
              borderRadius: "5px",
              padding: "3.5px",
            }}
          ></input>
        </Form.Group>

        {/* ///////////////////////////////// */}

        <Button variant="primary" type="submit" className="mb-3">
          {" "}
          Add
        </Button>
      </Form>
    </div>
  );
};

export default Add;
