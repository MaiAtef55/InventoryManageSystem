import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";

import { Link } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import axios from "axios";
import { getAuthUser } from "../../helper/Storage";
import { useParams } from "react-router-dom";   
const Managerequests = () => {
let { id } = useParams();

const storedObject = JSON.parse(localStorage.getItem("user"));
  const auth = getAuthUser();
  const [requests, setrequests] = useState({
    loading: true,
    results: [],
    err: null,
    reload: 0,
  });

  useEffect(() => {
    setrequests({ ...requests, loading: true });
    axios
    .get(`http://localhost:4000/Supervisor/search/${id}`)
      .then((resp) => {
        setrequests({ ...requests, results: resp.data, loading: false, err: null });
      })
      .catch((err) => {
        setrequests({
          ...requests,
          loading: false,
          err: " something went wrong, please try again later ! ",
        });
      });
  }, [requests.reload]);

 

  return (
    <div className="manage-movies p-5">
      <div className="header d-flex justify-content-between mb-5">
        <h3 className="text-center ">requests</h3>
       
      </div>

      

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>id</th>
            <th> quantity</th>
            <th> status</th>
            <th> warehouse-id</th>
            <th> product-id</th>
            <th>supervisorid-id</th>
          </tr>
        </thead>
        <tbody>
          {requests.results.map((requests) => (
            <tr key={requests.id}>
              <td>{requests.id}</td>
              <td> {requests.quantity} </td>
              <td>{requests.status}</td>
              <td>{requests.warehouseid}</td>
              <td>{requests.productid}</td>
              <td>{requests.supervisorid}</td>
              <td>
               
                
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Managerequests;