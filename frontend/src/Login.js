import React, { Component } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import './Login.css'
import axios from 'axios'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            invalidLoginInput: ""
        };
        this.login = this.login.bind(this);
    }

    login(e) {
        e.preventDefault()
        let that = this
        axios.post('http://localhost:3030/login/', {
            email: this.state.email,
            password: this.state.password,
        })
        .then(function (response) {
            let data = response.data.data

            if(response.status === 200) {
                localStorage.setItem('token', data.token)
                localStorage.setItem('userId', data.userId)
                localStorage.setItem('isAdmin', data.isAdmin)
                axios.defaults.headers.common['Authorization'] = data.token
                that.props.navigate('/home')
            }
        })
        .catch(function (error) {
            if (error.response.status === 401) 
                that.setState({invalidLoginInput: error.response.data.message})
        });
    }

    render() {
        if (localStorage.getItem('token')) {
            return (
                <Navigate to='/home' />
            )
        }
        return (
          <form>
            <h3>Sign In</h3>

            <div className="form-group">
                <label>Email address</label>
                <input type="email" className="form-control loginInput" placeholder="Enter email" 
                  onChange={(e) => this.setState({email: e.target.value})}/>
            </div>

            <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control loginInput" placeholder="Enter password"
                  onChange={(e) => this.setState({password: e.target.value})} />
            </div>

            <div>
                <p id = "invalidLoginInput" 
                    style = {{display: this.state.invalidLoginInput === "" ? 'none' : 'block'}}>
                        {this.state.invalidLoginInput}</p>
            </div>

            <button type="submit" className="btn btn-primary btn-block loginBtn" onClick = {this.login}>Submit</button>
          </form>
        );
    }
}

function WithNavigate(props) {
  let navigate = useNavigate();
  return <Login {...props} navigate={navigate} />
}

export default WithNavigate