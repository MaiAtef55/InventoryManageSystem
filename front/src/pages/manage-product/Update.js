import React, { useState ,useEffect} from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";   
const Updateprodect = () => {
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


    let { id } = useParams();
  const navigate = useNavigate();
  const [prodect, setprodect] = useState({
    stock: "",
    description: "",
    name: "",
    Warehouseid: "",
    loading: false,
    err: [],
    success: null,
  });

  const prodectFun = (e) => {
    e.preventDefault();
    setprodect({ ...prodect, loading: true, err: [] });
    axios
      .put(`http://localhost:4000/prodect/${id}`, {
        name: prodect.name,
        stock: prodect.stock,
        description: prodect.description,
        Warehouseid: prodect.Warehouseid,
        
      })
      .then((resp) => {
        setprodect({ ...prodect, loading: false, err: [], success: "prodect updated successfully!" });
      })
      .catch((errors) => {
        setprodect({
          ...prodect,
          loading: false,
          success: null,
          err: errors.response.data.errors,
        });
      });
  };
  

  return (
    <div className="login-container">
      <h1>Update prodect </h1>

      {prodect.err?.map((error, index) => (
        <Alert key={index} variant="danger" className="p-2">
          {error.msg}
        </Alert>
      ))}
      {prodect.success && (
        <Alert variant="success" className="p-2">
          {prodect.success}
        </Alert>
      )}

      <Form onSubmit={prodectFun}>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="prodect Name"
            value={prodect.name}
            onChange={(e) =>
              setprodect({ ...prodect, name: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            type="prodect stock"
            placeholder="stock"
            value={prodect.stock}
            onChange={(e) =>
              setprodect({ ...prodect, stock: e.target.value })
            }
          /> 
        </Form.Group>
        
        <Form.Group className="mb-3 p-2 text-center">
  
  <Form.Select
    value={prodect.Warehouseid}
    onChange={(e) =>
      setprodect({...prodect , Warehouseid : e.target.value})} 
    
  >
    <option value="">Select Warehouse</option>
    {warehouses.map((warehouse) => (
      <option key={warehouse.id} value={warehouse.id}>
        {warehouse.name}
      </option>
    ))}
  </Form.Select>
</Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            type="prodect description"
            placeholder="description"
            value={prodect.description}
            onChange={(e) =>
              setprodect({ ...prodect, description: e.target.value })
            }
          />
        </Form.Group>

        <Button
          className="btn btn-dark w-100"
          variant="primary"
          type="submit"
          disabled={prodect.loading === true}
        >
          Update prodect
        </Button>
      </Form>
    </div>
  );
};

export default Updateprodect;
