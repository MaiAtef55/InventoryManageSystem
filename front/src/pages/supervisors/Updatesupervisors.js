



import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import axios from "axios";

import { useParams } from "react-router-dom";   
const Updatesupervisors = () => {
let { id } = useParams();

const [user, setuser] = useState({
status: "",
type: "",
name: "",
phone: "",

loading: false,
err: [],
success: null,
});

const userFun = (e) => {
e.preventDefault();
setuser({ ...user, loading: true, err: [] });
axios
    .put(`http://localhost:4000/Supervisor/${id}`, {
    name: user.name,
    status: user.status,
   
    type: user.type,
    phone: user.phone,
    
    })
    .then((resp) => {
    setuser({ ...user, loading: false, err: [], success: "user updated successfully!" });
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
    <h1>Update user </h1>

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
        Update user
    </Button>
    </Form>
</div>
);
};

export default Updatesupervisors;

