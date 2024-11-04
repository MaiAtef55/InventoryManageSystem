import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";

import { Link } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import axios from "axios";
import { getAuthUser } from "../../helper/Storage";

const Managewarehouse = () => {
  const auth = getAuthUser();
  const [warehouse, setwarehouse] = useState({
    loading: true,
    results: [],
    err: null,
    reload: 0,
  });

  useEffect(() => {
    setwarehouse({ ...warehouse, loading: true });
    axios
      .get("http://localhost:4000/warehouses")
      .then((resp) => {
        setwarehouse({ ...warehouse, results: resp.data, loading: false, err: null });
      })
      .catch((err) => {
        setwarehouse({
          ...warehouse,
          loading: false,
          err: " something went wrong, please try again later ! ",
        });
      });
  }, [warehouse.reload]);

  const deletewarehouse = (id) => {
    axios
      .delete("http://localhost:4000/warehouses/" + id, {
        headers: {
          token: auth.token,
        },
      })
      .then((resp) => {
        setwarehouse({ ...warehouse, reload: warehouse.reload + 1 });
      })
      .catch((err) => {});
  };

  return (
    <div className="manage-warehouse p-5">
      <div className="header d-flex justify-content-between mb-5">
        <h3 className="text-center ">Manage warehouse</h3>
        <Link to={"addwarehouse"} className="btn btn-success">
          Add New warehouse +
        </Link>
      </div>

      

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>id</th>
           
            <th> Name</th>
            <th> location</th>
            <th> status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {warehouse.results.map((warehouse) => (
            <tr key={warehouse.id}>
              <td>{warehouse.id}</td>
             
              <td> {warehouse.name} </td>
              <td>{warehouse.location}</td>
              <td>{warehouse.status}</td>
              <td>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={(e) => {
                    deletewarehouse(warehouse.id);
                  }}>
                  Delete
                </button>
                <Link
                  to={"" + warehouse.id}
                  className="btn btn-sm btn-primary mx-2">
                  Update
                </Link>
                
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Managewarehouse;