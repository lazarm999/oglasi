import axios from "axios"
import { Component } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import './Profile.css'

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {}
        };
        this.fetchUser = this.fetchUser.bind(this)
        let pathname = this.props.location.pathname
        this.state.user._id = pathname.substring(pathname.lastIndexOf("/") + 1, pathname.length);
    }

    componentDidMount(){
        this.fetchUser()
    }

    fetchUser(){
        let that = this
        console.log(this.state.user._id)
        axios.get("http://localhost:3030/user/" + this.state.user._id)
        .then(function (response) {
            let data = response.data.data
            console.log(data)
            if(response.status === 200) {
                that.setState({
                    user: data
                })
            }
        })
        .catch(function (error) {
            if (error.response.status === 401) 
                that.setState({invalidLoginInput: error.response.data.message})
        });
    }

    render(){
        return(
            <div className="row py-5 px-4">
                <div className="col-md-5 mx-auto">
                    <div className="bg-white shadow rounded overflow-hidden">
                        <div className="px-4 pt-0 pb-4 cover">
                            <div className="media align-items-end profile-head">
                                <div className="profile mr-3"><img src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80" 
                                alt="..." width="130" className="rounded mb-2 img-thumbnail"/>
                                <a href="#" className="btn btn-outline-dark btn-sm btn-block">Edit profile</a></div>
                                <div className="media-body mb-5 text-white">
                                    <h4 className="mt-0 mb-0">{this.state.user.firstName + " " + this.state.user.lastName}</h4>
                                    <p className="small mb-4"> 
                                        <i className="fas fa-map-marker-alt mr-2">{this.state.user.phone}</i>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function WithNavigate(props) {
    let navigate = useNavigate();
    let location = useLocation();
    return <Profile {...props} navigate={navigate} location={location}/>
  }
  
  export default WithNavigate