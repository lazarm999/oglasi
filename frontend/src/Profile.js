import axios from "axios"
import { Component } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import './Profile.css'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { Ratings, Ads } from './Utility' 

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            activeTab: "ratings",
            showEditProfileModal: false,
            firstName: "",
            lastName: "",
            phone: "",
            ratings: [],
            myAds: []
        };
        this.fetchUser = this.fetchUser.bind(this)
        this.fetchAds = this.fetchAds.bind(this)
        this.fetchRatings = this.fetchRatings.bind(this)
        this.editProfile = this.editProfile.bind(this)
        let pathname = this.props.location.pathname
        this.state.user._id = pathname.substring(pathname.lastIndexOf("/") + 1, pathname.length);
    }

    componentDidMount(){
        this.fetchUser()
        this.fetchAds()
    }

    fetchUser(){
        let that = this
        axios.get("http://localhost:3030/user/" + this.state.user._id)
        .then(function (response) {
            let data = response.data.data
            if(response.status === 200) {
                that.setState({
                    user: data,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    phone: data.phone
                })
            }
        })
        .catch(function (error) {
            if (error.response.status === 401) 
                that.setState({invalidLoginInput: error.response.data.message})
        });
    }

    fetchAds(){
        let that = this
        axios.get("http://localhost:3030/myAds/")
        .then(function (response) {
            let data = response.data.data
            if(response.status === 200) {
                that.setState({
                    myAds: data
                })
            }
        })
        .catch(function (error) {
            console.log(error)
        });
    }

    fetchRatings(){
        
    }

    editProfile(e){
        e.preventDefault()
        axios.put("http://localhost:3030/updateProfile/",{
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            phone: this.state.phone
        })
        .then((response)=>{
            console.log(response)
            if(response.status === 204)
                window.location.reload()
        })
        .catch(function(error){
            console.log(error)
        })
    }

    render(){
        return(
            <div className="row py-5 px-4 col-md-6 offset-md-3">
                <Modal show={this.state.showEditProfileModal} onHide={() => this.setState({showEditProfileModal: false})}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit profile</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <div className="form-group">
                                <label>First name</label>
                                <input type="text" className="form-control" value={this.state.firstName}
                                        onChange={(e) => this.setState({firstName: e.target.value})}/>
                            </div>

                            <div className="form-group">
                                <label>Last name</label>
                                <input type="text" className="form-control" value={this.state.lastName}
                                        onChange={(e) => this.setState({lastName: e.target.value})}/>
                            </div>

                            <div className="form-group">
                                <label>Phone number</label>
                                <input type="text" className="form-control" value={this.state.phone}
                                        onChange={(e) => this.setState({phone: e.target.value})}/>
                            </div>
                            <div>
                                <p id = "invalidOrderInput" 
                                    style = {{display: this.state.invalidOrderInput === "" ? 'none' : 'block'}}>
                                        {this.state.invalidOrderInput}</p>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={this.editProfile}>
                            Submit
                        </Button>
                    </Modal.Footer>
                </Modal>
                <div className="mx-auto">
                    <div className="bg-white shadow rounded overflow-hidden">
                        <div className="px-4 pt-0 pb-4 cover">
                            <div className="media align-items-end profile-head"  style={{paddingBottom: "30px"}}>
                                <div className="profile mr-3">
                                    <img src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80" 
                                    alt="..." width="130" className="rounded mb-2 img-thumbnail"/>
                                </div>
                                <div className="media-body mb-5 text-white">
                                    <h4 className="mt-0 mb-0">{this.state.user.firstName + " " + this.state.user.lastName}</h4>
                                    <p className="small" style={{marginBottom: "4px"}}> 
                                        <i className="fas fa-map-marker-alt mr-2">{this.state.user.phone}</i>
                                    </p>
                                    {
                                        this.state.user._id === localStorage.getItem("userId") ? 
                                        <a href="#" className="btn btn-outline-primary"
                                            onClick={(e) => this.setState({showEditProfileModal: true})}>
                                            Edit profile
                                        </a>
                                        : null
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <ul className="nav nav-tabs" style={{backgroundColor: "white", padding: "3px"}}>
                        <li className="nav-item" onClick={(e) => this.setState({activeTab: "ads"})} style={{width: "50%", textAlign: "center"}}>
                            <a className={"nav-link " + (this.state.activeTab === "ads" ? "active" : "")}  aria-current="page" href="#">My ads</a>
                        </li>
                        <li className="nav-item" onClick={(e) => this.setState({activeTab: "ratings"})} style={{width: "50%", textAlign: "center"}}>
                            <a className={"nav-link " + (this.state.activeTab === "ratings" ? "active" : "")} aria-current="page" href="#">Ratings</a>
                        </li>
                    </ul>
                </div>
                <div>
                    <div style={{backgroundColor: "white", paddingTop: "15px", minHeight: "300px"}}>
                        {
                            this.state.activeTab === "ads" ? <Ads ads={this.state.myAds} /> :
                            <Ratings ratings = {this.state.ratings} />
                        }
                    </div>
                </div>
            </div>
        )
    }
}

function WithNavigate(props) {
    let navigate = useNavigate()
    let location = useLocation()
    return <Profile {...props} navigate={navigate} location={location}/>
}
  
export default WithNavigate