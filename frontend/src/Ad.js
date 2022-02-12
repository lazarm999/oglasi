import { Component } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import "react-responsive-carousel/lib/styles/carousel.min.css" // requires a loader
import { Carousel } from 'react-responsive-carousel'
import './Ad.css'
import { StarIcon, FillStarIcon } from './Utility'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { Locations, Ratings } from "./Utility"
import axios from "axios"

class Ad extends Component{
    constructor(){
        super()
        this.state = {
            ratings: [],
            ad: {
                picturePaths: []
            },
            ratingText: "",
            ratingValues: [1, 2, 3, 4, 5],
            rating: 0,
            showOrderModal: false,
            showUpdateModal: false,
            address: "",
            location: "",
            quantity: 0,
            invalidOrderInput: "",
            invalidUpdateInput: "",
            invalidRatingInput: "",
            title: "",
            price: 0,
            description: "",
            rateable: true
        }
        this.onStarClicked = this.onStarClicked.bind(this)
        this.makeOrder = this.makeOrder.bind(this)
        this.fetchAd = this.fetchAd.bind(this)
        this.fetchRatings = this.fetchRatings.bind(this)
        this.deleteAd = this.deleteAd.bind(this)
        this.updateAd = this.updateAd.bind(this)
        this.postRating = this.postRating.bind(this)

        let pathname = window.location.href
        this.state.ad._id = pathname.substring(pathname.lastIndexOf("/") + 1, pathname.length);
    }

    componentDidMount(){
        this.fetchAd()
        this.fetchRatings()
    }

    fetchAd(){
        let that = this
        axios.get("http://localhost:3030/getAd/" + this.state.ad._id)
        .then(function(response){
            let data = response.data.data
            if(response.status === 200)
                that.setState({
                    ad: data,
                    title: data.title,
                    description: data.description,
                    price: data.price,
                    rateable: response.data.rateable
                })
        })
        .catch(function(error){
            console.log(error)
        })
    }

    fetchRatings(){
        axios.get("http://localhost:3030/adRatings/" + this.state.ad._id)
        .then((response) => {
            let data = response.data.data
            if(response.status === 200)
                this.setState({
                    ratings: data
                })
        })
        .catch(function(error){
            console.log(error)
        })
    }

    onStarClicked(e, rating){
        e.preventDefault()
        this.setState({
            rating: rating
        })
    }

    makeOrder(){
        if(this.state.quantity === 0) {
            this.setState({invalidOrderInput: "Quantity must be greater than 0."})
            return
        } else if (this.state.quantity === "" || this.state.address === "" || this.state.location === ""){
            this.setState({invalidOrderInput: "All fields must be filled."})
            return
        }
        axios.post("http://localhost:3030/order/" + this.state.ad._id,{
            quantity: this.state.quantity,
            address: this.state.address,
            city: this.state.location
        })
        .then((response) => {
            if(response.status === 201)
                window.location.reload()
        })
        .catch(function(error){
            console.log(error)
        })
    }

    deleteAd(e){
        e.preventDefault()
        if(this.state.title === ""){
            this.setState({invalidUpdateInput: 'Title must not be empty.'})
            return
        }
        axios.delete("http://localhost:3030/deleteAd/" + this.state.ad._id)
        .then((response)=>{
            if(response.status === 204)
                window.location.replace("http://localhost:3000/home")
        })
        .catch(function(error){
            console.log(error)
        })
    }

    updateAd(e){
        e.preventDefault()
        if(this.state.title === ""){
            this.setState({invalidUpdateInput: 'Title must not be empty.'})
            return
        }
        axios.put("http://localhost:3030/updateAd/" + this.state.ad._id,{
            title: this.state.title,
            description: this.state.description,
            price: this.state.price
        })
        .then((response)=>{
            if(response.status === 204)
                window.location.reload()
        })
        .catch(function(error){
            console.log(error)
        })
    }

    postRating(e){
        e.preventDefault()
        if(this.state.rating === 0 || this.state.comment === ""){
            this.setState({invalidRatingInput: "You must leave a comment and rating must be greater than 0."})
            return
        }
        axios.post("http://localhost:3030/rate/" + this.state.ad._id,{
            rating: this.state.rating,
            comment: this.state.ratingText,
        })
        .then((response)=>{
            if(response.status === 201)
                window.location.reload()
        })
        .catch(function(error){
            console.log(error)
        })
    }

    render(){
        let ad = this.state.ad
        return(
            <div className="row col-md-6 offset-md-3" 
                style={{backgroundColor: "white", display: "flex"}}>
                <Modal show={this.state.showOrderModal} onHide={() => this.setState({showOrderModal: false})}>
                    <Modal.Header closeButton>
                        <Modal.Title>Order</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <div className="form-group">
                                <label>Address</label>
                                <input type="text" className="form-control" value={this.state.address}
                                        onChange={(e) => this.setState({address: e.target.value})}/>
                            </div>

                            <div className="form-group">
                                <label>Location</label>
                                <Locations setLocation = {(location) => this.setState({location: location})} />
                            </div>

                            <div className="form-group">
                                <label>Quantity</label>
                                <input type="number" className="form-control" value={this.state.quantity} min="0"
                                    onChange={(e) => this.setState({quantity: e.target.value})}/>
                            </div>
                            <div>
                                <p id = "invalidOrderInput" 
                                    style = {{display: this.state.invalidOrderInput === "" ? 'none' : 'block'}}>
                                        {this.state.invalidOrderInput}</p>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={this.makeOrder}>
                            Make order
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={this.state.showUpdateModal} onHide={() => this.setState({showUpdateModal: false})}>
                    <Modal.Header closeButton>
                        <Modal.Title>Update ad</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <div className="form-group">
                                <label>Title</label>
                                <input type="text" className="form-control" value={this.state.title}
                                        onChange={(e) => this.setState({title: e.target.value})}/>
                            </div>

                            <div className="form-group">
                                <label>Description</label>
                                <textarea rows="6" className="form-control" cols="50" value={this.state.description}
                                    onChange={(e) => this.setState({description: e.target.value})}/>
                            </div>

                            <div className="form-group">
                                <label>Price</label>
                                <input type="number" min="0" className="form-control" value={this.state.price}
                                    onChange={(e) => this.setState({price: e.target.value})}/>
                            </div>
                            <div>
                                <p id = "invalidUpdateInput" 
                                    style = {{display: this.state.invalidOrderInput === "" ? 'none' : 'block'}}>
                                        {this.state.invalidOrderInput}</p>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={this.updateAd}>
                            Submit
                        </Button>
                    </Modal.Footer>
                </Modal>
                <div className="col-md-12">
                    <h3>{ad.title}</h3>
                </div>
                <div className="col-md-4">
                    <img src= { ad.picturePaths.length === 0 ? "../defaultProduct.png" : "http://localhost:3030/" + ad.picturePaths[0]}
                         width="100" height="100"/>
                </div>
                <div className="col-md-4">
                    <p style={{marginBottom: "0px"}}>Price: {ad.price} din.</p>
                    {
                        ad.ownerId === localStorage.getItem("userId") ? 
                        <button id="addAdBtn" type="submit" className="btn btn-danger btn-block oduButtons" 
                        onClick={this.deleteAd}>Delete</button> : null
                    }
                    {
                        ad.ownerId === localStorage.getItem("userId") ? 
                        <button id="addAdBtn" type="submit" className="btn btn-primary btn-block oduButtons" 
                        onClick={(e) => this.setState({showUpdateModal: true})}>Update</button> : null
                    }
                    {
                        ad.ownerId !== localStorage.getItem("userId") ? 
                        <button id="addAdBtn" type="submit" className="btn btn-warning btn-block oduButtons" 
                        onClick={(e) => this.setState({showOrderModal: true})}>Order</button> : null
                    }
                </div>
                <div className="col-md-4">
                    <a href= {"http://localhost:3000/profile/" + ad.ownerId} style={{textDecoration: "none"}}>
                        {ad.ownerName}
                    </a>
                </div>
                <h4>Description</h4>
                <div className="col-md-12" style={{padding: "10px"}}>
                    <p style={{marginLeft: "10px"}}>
                        {ad.description}
                    </p>
                </div>
                {
                    ad.picturePaths.length > 0 ?
                    <div>
                        <h4>Gallery</h4>
                        <div className="gallery col-md-12">
                            <Carousel showThumbs={false}>
                                {
                                    ad.picturePaths.map((picId, i) => (
                                        <div  key={i}>
                                            <img src={"http://localhost:3030/" + picId}/>
                                        </div>
                                    ))
                                }
                                
                            </Carousel>
                        </div>
                    </div> : null
                }
                {
                    this.state.rateable ? 
                    <div className="form-group">
                        <label style={{marginBottom: "10px"}}>Leave a rating</label>
                        <div style={{marginBottom: "10px"}}>
                        {
                            this.state.ratingValues.map((rating, i) => (
                                <a style={{cursor: "pointer", marginRight: "5px"}}
                                key={i} onClick={(e) => this.onStarClicked(e, rating)}>
                                    {
                                        rating <= this.state.rating ? 
                                        <FillStarIcon /> : <StarIcon />
                                    }
                                </a>
                            ))
                        }
                        </div>
                        <textarea rows="5" className="form-control" cols="50" value={this.state.ratingText}
                            onChange={(e) => this.setState({ratingText: e.target.value})}
                            style={{marginBottom: "10px"}} />
                        <div>
                            <p style = {{display: this.state.invalidRatingInput === "" ? 'none' : 'block', marginBottom: "10px"}}>
                                    {this.state.invalidRatingInput}</p>
                        </div>
                        <button style={{marginBottom: "10px"}} className="btn btn-primary btn-block" onClick={this.postRating}>Rate</button>
                    </div> : null
                }
                <h4 style={{marginBottom: "10px"}}>Ratings</h4>
                <Ratings ratings={this.state.ratings} />
            </div>
        )
    }
}

function WithNavigate(props) {
    let navigate = useNavigate()
    return <Ad {...props} navigate={navigate}/>
}
  
export default WithNavigate