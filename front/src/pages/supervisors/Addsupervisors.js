
import React, { useState ,useEffect} from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import axios from "axios";


const Addsupervisors = () => {
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


const [user, setuser] = useState({

    name: "",
    email: "",
    password: "",
    phone: "",
    type: "",
     Warehouseid: "",
    status:"",
loading: false,
err: [],
success: null,
});

const userFun = (e) => {
e.preventDefault();
setuser({ ...user, loading: true, err: [] });
axios
    .post("http://localhost:4000/Supervisor", {
        name: user.name,
        email: user.email,
        Warehouseid: user.Warehouseid,
        password: user.password,
        phone: user.phone,
        type: user.type,
    status: user.status,
    
    })
    .then((resp) => {
    setuser({ ...user, loading: false, err: [], success: "user Created Successfully !" });
    })
    .catch((errors) => {
    setuser({
        ...user,
        loading: false,
        success: null,
        err: errors.response.data.errors,
    });
    });
};

return (
<div className="login-container">
    <h1>Add a new user</h1>

    {user.err?.map((error, index) => (
    <Alert key={index} variant="danger" className="p-2">
        {error.msg}
    </Alert>
    ))}
    {user.success && (
    <Alert variant="success" className="p-2">
        {user.success}
    </Alert>
    )}

    <Form onSubmit={userFun}>
    <Form.Group className="mb-3">
        <Form.Control
        type="text"
        placeholder="Full Name"
        value={user.name}
        onChange={(e) =>
            setuser({ ...user, name: e.target.value })
        }
        />
    </Form.Group>
    
    <Form.Group className="mb-3">
        <Form.Control
        type="email"
        placeholder="email"
        value={user.email}
        onChange={(e) =>
            setuser({ ...user, email: e.target.value })
        }
        />
    </Form.Group>
    
    <Form.Group className="mb-3">
        <Form.Control
        type="password"
        placeholder="password"
        value={user.password}
        onChange={(e) =>
            setuser({ ...user, password: e.target.value })
        }
        />
     </Form.Group>
     <Form.Group className="mb-3">
        <Form.Control
        type="text"
        placeholder="phone"
        value={user.phone}
        onChange={(e) =>
            setuser({ ...user, phone: e.target.value })
        }
        />
    </Form.Group>        

    <Form.Group className="mb-3">
        <Form.Control
        type="text"
        placeholder="type"
        value={user.type}
        onChange={(e) =>
            setuser({ ...user, type: e.target.value })
        }
        />
            </Form.Group> 
            <Form.Group className="mb-3 p-2 text-center">

  <Form.Select
    value={user.Warehouseid}
    onChange={(e) =>
      setuser({...user , Warehouseid : e.target.value})} 
    
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
        type="text"
        placeholder="status"
        value={user.status}
        onChange={(e) =>
            setuser({ ...user, status: e.target.value })
        }
        />
            </Form.Group>
    <Button
        className="btn btn-dark w-100"
        variant="primary"
        type="submit"
        disabled={user.loading === true}
    >
        add user
    </Button>
    </Form>
</div>
);
};

export default Addsupervisors;
/*    <Form.Group className="mb-3">
        <Form.Control
        type="text"
        placeholder="type"
        value={user.type}
        onChange={(e) =>
            setuser({ ...user, type: e.target.value })
        }
        />
            </Form.Group> 
            <Form.Group className="mb-3">
        <Form.Control
        type="text"
        placeholder="status"
        value={user.status}
        onChange={(e) =>
            setuser({ ...user, status: e.target.value })
        }
        />
            </Form.Group>  */