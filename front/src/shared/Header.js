import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import "../css/Header.css";
import { removeAuthUser, getAuthUser } from "../helper/Storage";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const auth = getAuthUser();
  const Logout = () => {
    removeAuthUser();
    navigate("/home");
  };

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>
            <Link className="nav-link" to={"/"}>
              EDARA
            </Link>
          </Navbar.Brand>
          <Nav className="me-auto">
            {/* unAuthenticated Route  */}
            {!auth && (
              <>
                <Link className="nav-link" to={"/login"}>
                  Login
                </Link>
              </>
            )}

            {/* Admin Routes  */}

            {auth && auth.type === "admin" && (
              <>
                <Link className="nav-link" to={"/ManageProduct"}>
                  manage product
                </Link>
                <Link className="nav-link" to={"/Managewarehouse"}>
                  manage warehouse
                </Link>
                <Link className="nav-link" to={"/supervisors"}>
                  manage supervisors
                </Link>
                <Link className="nav-link" to={"/Managerequest"}>
                  manage request
                </Link>
                <Link className="nav-link" to={"/allrequest"}>
                  history request
                </Link>
                <Link className="nav-link" to={"/Allproductcurd"}>
                  All product
                </Link>
                <Link className="nav-link" to={"/warehouselist"}>
                  warehouse
                </Link>
              </>
            )}
            {/* user Routes  */}

            {auth && auth.type === "user" && (
              <>
                <Link className="nav-link" to={"/Productcurd"}>
                  product
                </Link>

                <Link className="nav-link" to={"/request"}>
                  request
                </Link>
              </>
            )}
          </Nav>

          <Nav className="me-auto">
            {/* Authenticated Routes  */}

            {auth && (
              <>
                <Nav.Link onClick={Logout}>Logout</Nav.Link>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
