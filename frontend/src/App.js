import React from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Login from './Login'
import Register from './Register';
import { Routes, Route, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Home from './Home'
import Profile from './Profile'
import AddAd from './AddAd'
import Ad from './Ad'
import Orders from './Orders'
import Statistics from './Statistics'
import axios from "axios";

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <Link className="navbar-brand" to={"/login"}>Oglasi</Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                {
                localStorage.getItem('token') ? 
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link className="nav-link" to={"/home"}>Home</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={"/myOrders"}>My orders</Link>
                  </li> 
                  <li className="nav-item">
                    <Link className="nav-link" to={"/orders"}>Orders</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={"/profile/" + localStorage.getItem('userId')}>Profile</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={"/addAd"}>Add ad</Link>
                  </li>
                  {
                    localStorage.getItem("isAdmin") === "true" ?
                    <li className="nav-item">
                      <Link className="nav-link" to={"/statistics"}>Statistics</Link>
                    </li> : null
                  }
                  <li className="nav-item">
                    <a href="" className="nav-link" onClick={
                      (e) => {
                        e.preventDefault()
                        localStorage.removeItem('token')
                        delete axios.defaults.headers.common['Authorization']
                        this.props.navigate('/login')
                      }
                    }>Log out</a>
                  </li>
                </ul>
                :
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link className="nav-link" to={"/login"}>Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={"/register"}>Register</Link>
                  </li>
                </ul>
                }
            </div>
          </div>
        </nav>

        <div className = "content">
        <Routes>
          <Route exact path='/' element={
            <div className="auth-wrapper">
              <div className="auth-inner">
                <Login/>
              </div>
            </div>
            } />
          <Route path="/login" element={
            <div className="auth-wrapper">
              <div className="auth-inner">
                <Login/>
              </div>
            </div>
          } />
          <Route path="/register" element={
            <div className="auth-wrapper">
              <div className="auth-inner">
                <Register/>
              </div>
            </div>
          } />
          <Route path="/home" element={<Home/>} />
          <Route path="/profile/:userId" element={<Profile/>} />
          <Route path="/addAd" element={<AddAd/>} />
          <Route path="/ad/:adId" element={<Ad/>} />
          <Route path="/myOrders" element={<Orders key="myOrders" isMyOrders={true}/>} />
          <Route path="/orders" element={<Orders key="orders" isMyOrders={false}/>} />
          <Route path="/statistics" element={<Statistics/>} />
        </Routes>
        </div>
        
      </div>
    );
  }
}

function WithNavigate(props) {
  let navigate = useNavigate();
  return <App {...props} navigate={navigate} />
}

export default WithNavigate
