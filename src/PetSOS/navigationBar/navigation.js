import React from "react";
import { Link, useLocation } from "react-router-dom";
import './navigation.css'
import { useSelector, useDispatch } from "react-redux";
import { logoutThunk } from "../services/auth-thunk";
import { useNavigate } from "react-router";


const NavigationBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const { pathname } = useLocation();
  // const [, , active] = pathname.split("/");
  const [,active] = pathname.split("/");

  const handleLogout = () => {
    dispatch(logoutThunk());
    navigate("/login");
  };

  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg bg-body-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img src="/img/logo.png" alt="Logo" width="74" height="55" className="d-inline-block align-text-top logo" />
            <span className="name">PetSOS</span>
          </Link>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className={`nav-item ${active === "home" || active === "" ? "active" : ""}`}>
                <Link className="nav-link" to="/home">Home</Link>
              </li>
              <li className={`nav-item ${active === "reportFound" ? "active" : ""}`}>
                <Link className="nav-link" to="/reportFound">I Found a Pet</Link>
              </li>
              <li className={`nav-item ${active === "reportLost" ? "active" : ""}`}>
                <Link className="nav-link" to="/reportLost">I Lost a Pet</Link>
              </li>
              <li className={`nav-item ${active === "search" ? "active" : ""}`}>
                <Link className="nav-link" to="/search">Search</Link>
              </li>
              {currentUser ? (
                <li className={`nav-item ${active === "profile" ? "active" : ""}`}>
                  <div className="nav1">
                    <Link className="nav-link dropdown-toggle" aria-expanded="true" to="/profile">{currentUser.username}</Link>
                    <div className="nav2">
                      <Link className="link" to="/profile"><button>Profile</button></Link>
                      <button onClick={handleLogout}>Logout</button> 
                    </div>
                  </div>
                </li>
              ) : (
                <li className={`nav-item ${active === "login" || active === "register" ? "active" : ""}`}>
                  <Link className="nav-link" to="/login">Log in</Link>
                </li>
              )}
            </ul>
          </div>
        </div >
      </nav >
    </div >
  );
};

export default NavigationBar;