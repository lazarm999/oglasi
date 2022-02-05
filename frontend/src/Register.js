import { Component } from "react";
import './Register.css';
import { useNavigate, Navigate } from "react-router-dom";
import axios from 'axios'

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            phone: "",
            invalidRegInput: ""
        };
        this.register = this.register.bind(this);
    }

    register(e) {
        e.preventDefault()
        let that = this
        if(this.state.email === "" || this.state.password === "" ||
            this.state.firstName === "" || this.state.lastName === "") {
            this.setState({invalidRegInput: 'You need to fill all fields marked with *'}); 
            return
        }
        axios.post('http://localhost:3030/register/', {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            phone: this.state.phone,
            email: this.state.email,
            password: this.state.password,
        })
        .then(function (response) {
            if(response.status === 200)
                that.props.navigate('/login')
        })
        .catch(function (error) {
            let data = error.response.data
            if (error.response.status === 400) 
                that.setState({invalidRegInput: data.message})
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
                <h3>Register</h3>

                <div className="form-group">
                    <label>First name *</label>
                    <input type="text" className="form-control regInput" placeholder="First name" value={this.state.firstName}
                            onChange={(e) => this.setState({firstName: e.target.value})}/>
                </div>

                <div className="form-group">
                    <label>Last name *</label>
                    <input type="text" className="form-control regInput" placeholder="Last name" 
                        onChange={(e) => this.setState({lastName: e.target.value})}/>
                </div>

                <div className="form-group">
                    <label>Telephone number</label>
                    <input type="text" className="form-control regInput" placeholder="Telephone number" 
                        onChange={(e) => this.setState({phone: e.target.value})}/>
                </div>

                <div className="form-group">
                    <label>Email address *</label>
                    <input type="email" className="form-control regInput" placeholder="Enter email" 
                    onChange={(e) => this.setState({email: e.target.value})}/>
                </div>

                <div className="form-group">
                    <label>Password *</label>
                    <input type="password" className="form-control regInput" placeholder="Enter password" 
                     onChange={(e) => this.setState({password: e.target.value})}/>
                </div>

                <div>
                    <p id = "invalidRegInput" 
                       style = {{display: this.state.invalidRegInput === "" ? 'none' : 'block'}}>
                            {this.state.invalidRegInput}</p>
                </div>

                <button id="regBtn" type="submit" className="btn btn-primary btn-block" onClick={this.register}>Sign Up</button>
            </form>
        );
    }
}

function WithNavigate(props) {
    let navigate = useNavigate();
    return <Register {...props} navigate={navigate} />
}

export default WithNavigate