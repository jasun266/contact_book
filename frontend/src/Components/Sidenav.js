import React from 'react';
import Logo from '../assets/img/logo-ct.png'
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { routes, callApi } from '../routes';
function Sidenav({ isAdmin, setLoggedIn, setIsAdmin }) {
  const navigate = useNavigate()
  const logout = () => {
    callApi(routes.logout).then(result => { 
      console.log(result)
      setLoggedIn(false)
      setIsAdmin(false) 
      navigate("/login")
    })
  }

  return (
  <aside className="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3 bg-gradient-dark" id="sidenav-main">
  <div className="sidenav-header">
    <i className="fas fa-times p-3 cursor-pointer text-white opacity-5 position-absolute end-0 top-0 d-none d-xl-none" aria-hidden="true" id="iconSidenav"></i>
    <a className="navbar-brand m-0" href=" https://demos.creative-tim.com/material-dashboard/pages/dashboard " target="_blank">
      <img src={Logo} className="navbar-brand-img h-100" alt="main_logo" />
      <span className="ms-1 font-weight-bold text-white">&nbsp;&nbsp; Contact App</span>
    </a>
  </div>
  <hr className="horizontal light mt-0 mb-2" />
  <div className="collapse navbar-collapse  w-auto  max-height-vh-100" id="sidenav-collapse-main">
    <ul className="navbar-nav">
      <li className="nav-item">
        <Link className="nav-link text-white active bg-gradient-primary" to="/">
          <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
            <i className="material-icons opacity-10">dashboard</i>
          </div>
          <span className="nav-link-text ms-1">Dashboard</span>
        </Link>
      </li>   
      {!isAdmin && <li className="nav-item">
        <Link className="nav-link text-white" to="/file/upload">
          <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
            <i className="material-icons opacity-10">assignment</i>
          </div>
          <span className="nav-link-text ms-1">Upload File</span>
        </Link>
      </li>}   
      <li className="nav-item mt-3">
        <h6 className="ps-4 ms-2 text-uppercase text-xs text-white font-weight-bolder opacity-8">Account pages</h6>
      </li>
      <li className="nav-item">
        <Button className="nav-link text-white" onClick={logout}>
          <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
            <i className="material-icons opacity-10">login</i>
          </div>
          <span className="nav-link-text ms-1">Logout</span>
        </Button>
      </li>
      {isAdmin && <li className="nav-item">
        <Link className="nav-link text-white " to="/register">
          <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
            <i className="material-icons opacity-10">assignment</i>
          </div>
          <span className="nav-link-text ms-1">Register</span>
        </Link>
      </li>}
    </ul>
  </div>
</aside>)
;
}
const Button = styled.div`
  background: none;
  outline: none;
  border: none;
  cursor: pointer;
`
export default Sidenav;
