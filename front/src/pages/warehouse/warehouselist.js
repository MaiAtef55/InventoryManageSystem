import React, { useState, useEffect } from "react";
import WarehouseCard from "../../components/WarehouseCard";
import Form from "react-bootstrap/Form";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";

const Warehouse = () => {
  const storedObject = JSON.parse(localStorage.getItem("user"));

  const [Warehouse, setWarehouse] = useState({
    loading: true,
    results: [],
    err: null,
    reload: 0,
  });

  const [search, setSearch] = useState("");

  useEffect(() => {
    setWarehouse({ ...Warehouse, loading: true });
    axios
      .get("http://localhost:4000/warehouses", {
        params: {
          search: search,
        },
      })
      .then((resp) => {
        setWarehouse({
          ...Warehouse,
          results: resp.data,
          loading: false,
          err: null,
        });
      })
      .catch((err) => {
        setWarehouse({
          ...Warehouse,
          loading: false,
          err: err.response.data.err,
        });
      });
  }, [Warehouse.reload]);

  const searchWarehouse = (e) => {
    e.preventDefault();
    setWarehouse({ ...Warehouse, reload: Warehouse.reload + 1 });
  };

  return (
    <div className="home-container p-5">
      {/* Loader  */}
      {Warehouse.loading === true && (
        <div className="text-center">
          <Spinner animation="grow" size="sm" />
          <Spinner animation="grow" />
        </div>
      )}

      {Warehouse.loading === false && Warehouse.err == null && (
        <>
          {/* Filter  */}
          <Form onSubmit={searchWarehouse}>
            <Form.Group className="mb-3 d-flex">
              <Form.Control
                type="text"
                placeholder=" Warehouses"
                className="rounded-0"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button className="btn btn-dark rounded-0">Search</button>
            </Form.Group>
          </Form>

          <div className="row ">
            {Warehouse.results.map((warehouse) => (
              <div className="col-3 " key={warehouse.id}>
                <WarehouseCard
                  name={warehouse.name}
                  location={warehouse.location}
                  status={warehouse.status}
                  id={warehouse.id}
                />{" "}
              </div>
            ))}
          </div>
        </>
      )}

      {/* ERRORS HANDLING  */}
      {Warehouse.loading === false && Warehouse.err != null && (
        <Alert variant="danger" className="p-2">
          {Warehouse.err}
        </Alert>
      )}

      {Warehouse.loading === false &&
        Warehouse.err == null &&
        Warehouse.results.length === 0 && (
          <Alert variant="danger" className="p-2">
            No Warehouse,
          </Alert>
        )}
    </div>
  );
};

export default Warehouse;
