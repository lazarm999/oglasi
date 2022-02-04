import React from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Login from './Login'
import Register from './Register';
import { Routes, Route, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

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
                localStorage.getItem('token') ? null
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
