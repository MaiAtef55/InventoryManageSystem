import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";

import { Link } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import axios from "axios";
import { getAuthUser } from "../../helper/Storage";

const Manageuser = () => {
  const auth = getAuthUser();
  const [user, setuser] = useState({
    loading: true,
    results: [],
    err: null,
    reload: 0,
  });

  useEffect(() => {
    setuser({ ...user, loading: true });
    axios
      .get("http://localhost:4000/Supervisor")
      .then((resp) => {
        setuser({ ...user, results: resp.data, loading: false, err: null });
      })
      .catch((err) => {
        setuser({
          ...user,
          loading: false,
          err: " something went wrong, please try again later ! ",
        });
      });
  }, [user.reload]);

  const deletesupervisors = (id) => {
    axios
      .delete("http://localhost:4000/Supervisor/" + id, {
        headers: {
          token: auth.token,
        },
      })
      .then((resp) => {
        setuser({ ...user, reload: user.reload + 1 });
      })
      .catch((err) => {});
  };

  return (
    <div className="manage-user p-5">
      <div className="header d-flex justify-content-between mb-5">
        <h3 className="text-center ">Manage user</h3>
        <Link to={"Addsupervisors"} className="btn btn-success">
          Add New supervisor +
        </Link>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>id</th>
            <th> Name</th>
            <th> email</th>
            <th> phone</th>
            <th> type</th>
            <th> status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {user.results.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td> {user.name} </td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.type}</td>
              <td>{user.status}</td>
              <td>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={(e) => {
                    deletesupervisors(user.id);
                  }}
                >
                  Delete
                </button>
                <Link to={"" + user.id} className="btn btn-sm btn-primary mx-2">
                  Update
                </Link>
                <Link to={"Show/" + user.id} className="btn btn-sm btn-info">
                  show
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Manageuser;

/*
import "../../css/Header.css";

import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";

import axios from "axios";
import { getAuthUser } from "../../helper/Storage";

const Mangesupervisors = () => {
  const auth = getAuthUser();
  const [user, setSupervisors] = useState({
    loading: true,
    results: [],
    err: null,
    reload: 0,
  });

useEffect(() => {
  setSupervisors({ ...user, loading: true });
    axios
      .get("http://localhost:4000/Supervisor")
      .then((resp) => {
        setSupervisors({ ...user, results: resp.data, loading: false, err: null });
      })
      .catch((err) => {
        setSupervisors({
          ...user,
          loading: false,
          err: " something went wrong, please try again later ! ",
        });
      });
  }, [user, user.reload]);
  const deletesupervisors = (id) => {
    axios
      .delete("http://localhost:4000/Supervisor/" + id, {
        headers: {
          token: auth.token,
        },
      })
      .then((resp) => {
        setSupervisors({ ...user, reload: user.reload + 1 });
      })
      .catch((err) => {});
  };


  return (
    <div className="p-5">
      <div className="header d-flex justify-content-between mb-5">
        <h3 className="text-center ">Supervisors</h3>
        <Link to={"add"} className="btn btn-success">
          Add New Supervisor +
        </Link>
      </div>

      

      <Table   striped bordered hover>
        <thead>
          <tr>
            <th>id</th>
            <th> Name</th>
            <th> email</th>
            <th> phone</th>
            <th> type</th>
            <th> status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {user.results.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td> {user.name} </td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.type}</td>
              <td>{user.status}</td>
              <td>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={(e) => {
                    deletesupervisors(user.id);
                  }}>
                  Delete
                </button>
                <Link
                  to={"" + user.id}
                  className="btn btn-sm btn-primary mx-2">
                  Update
                </Link>
                <Link to={"Show/" + user.id} className="btn btn-sm btn-info">
                  show
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Mangesupervisors;



*/
