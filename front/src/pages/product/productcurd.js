import React, { useState, useEffect } from "react";
import ProductCard from "../../components/ProductCard";
import Form from "react-bootstrap/Form";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";

const Home = () => {
  const storedObject = JSON.parse(localStorage.getItem("user"));
  const [Product, setProduct] = useState({
    loading: true,
    results: [],
    err: null,
    reload: 0,
  });

  useEffect(() => {
    setProduct({ ...Product, loading: true });
    axios
      .get("http://localhost:4000/prodect/"+storedObject.Warehouseid, {
        params: {},
      })
      .then((resp) => {
        console.log(resp);
        setProduct({
          ...Product,
          results: resp.data,
          loading: false,
          err: null,
        });
      })
      .catch((err) => {
        setProduct({
          ...Product,
          loading: false,
          err: " something went wrong, please try again later ! ",
        });
      });
  }, [Product.reload]);

  return (
    <div className="home-container p-5">
      {/* Loader  */}
      {Product.loading === true && (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}

      {Product.loading === false && Product.err == null && (
        <>
          <div className="row ">
            {Product.results.map((Product ) => (
              <div className="col-4 " key={Product.id}>
                <ProductCard
                  name={Product.name}
                  description={Product.description}
                  image={Product.image_url}
                  id={Product.id}
                  stock={Product.stock}
                />
              </div>
            ))}
          </div>
        </>
      )}

      {/* ERRORS HANDLING  */}
      {Product.loading === false && Product.err != null && (
        <Alert variant="danger" className="p-2">
          {Product.err}
        </Alert>
      )}

      {Product.loading === false &&
        Product.err == null &&
        Product.results.length === 0 && (
          <Alert variant="info" className="p-2">
            No Product, please try again later !
          </Alert>
        )}
    </div>
  );
};

export default Home;
