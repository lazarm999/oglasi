import { Component } from "react"
import { useNavigate } from "react-router-dom"
import "react-responsive-carousel/lib/styles/carousel.min.css" // requires a loader
import { Carousel } from 'react-responsive-carousel'
import './Ad.css'
import { StarIcon, FillStarIcon } from './Utility'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { Locations, Ratings } from "./Utility"

class Ad extends Component{
    constructor(){
        super()
        this.state = {
            ratings: [1],
            ad: {},
            ratingText: "",
            ratingValues: [1, 2, 3, 4, 5],
            currentRating: 0,
            showOrderModal: false,
            showUpdateModal: false,
            address: "",
            location: "",
            ammount: 0,
            invalidOrderInput: "",
            title: "",
            price: 0,
            description: ""
        }
        this.onStarClicked = this.onStarClicked.bind(this)
        this.makeOrder = this.makeOrder.bind(this)
        this.fetchAd = this.fetchAd.bind(this)
        this.fetchRatings = this.fetchRatings.bind(this)
        this.deleteAd = this.deleteAd.bind(this)
        this.updateAd = this.updateAd.bind(this)
    }

    fetchAd(){

    }

    fetchRatings(){
        
    }

    onStarClicked(e, rating){
        e.preventDefault()
        this.setState({
            currentRating: rating
        })
    }

    makeOrder(){
        if(this.state.ammount === 0) {
            this.setState({invalidOrderInput: "Ammount must be greater than 0."})
            return
        } else if (this.state.ammount === "" || this.state.address === "" || this.state.location === ""){
            this.setState({invalidOrderInput: "All fields must be filled."})
            return
        }
    }

    deleteAd(){

    }

    updateAd(){

    }

    render(){
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
                                <label>Ammount</label>
                                <input type="number" className="form-control" value={this.state.ammount} min="0"
                                    onChange={(e) => this.setState({ammount: e.target.value})}/>
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
                                <p id = "invalidOrderInput" 
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
                    <h3>Ovo je naslov</h3>
                </div>
                <div className="col-md-4">
                    <img src="defaultProduct.png" width="100" height="100"/>
                </div>
                <div className="col-md-4">
                    <p style={{marginBottom: "0px"}}>Price: 100,00 din.</p>
                    <button id="addAdBtn" type="submit" className="btn btn-warning btn-block oduButtons" 
                        onClick={(e) => this.setState({showOrderModal: true})}>Order</button>
                    <button id="addAdBtn" type="submit" className="btn btn-danger btn-block oduButtons" 
                        onClick={this.deleteAd}>Delete</button>
                    <button id="addAdBtn" type="submit" className="btn btn-primary btn-block oduButtons" 
                        onClick={(e) => this.setState({showUpdateModal: true})}>Update</button>
                </div>
                <div className="col-md-4">
                    <a href="/user" style={{textDecoration: "none"}}>Marko Nikolic</a>
                    <p>0641179370</p>
                </div>
                <div className="col-md-12">
                    <p>
                        ovo je jedan mnogo veliki opis koji je korisnik dodao
                    </p>
                </div>
                <h4>Gallery</h4>
                <div className="gallery col-md-12">
                    <Carousel showThumbs={false}>
                        <div>
                            <img src="https://i.picsum.photos/id/1003/1181/1772.jpg?hmac=oN9fHMXiqe9Zq2RM6XT-RVZkojgPnECWwyEF1RvvTZk" />
                        </div>
                        <div>
                            <img src="https://static.vecteezy.com/packs/media/components/global/search-explore-nav/img/vectors/term-bg-1-666de2d941529c25aa511dc18d727160.jpg" />
                        </div>
                        <div style={{width: "50%", height: "200px"}}>
                            <img src="assets/3.jpeg" />
                        </div>
                    </Carousel>
                </div>
                <div className="form-group">
                    <label style={{marginBottom: "10px"}}>Leave a rating</label>
                    <div style={{marginBottom: "10px"}}>
                    {
                        this.state.ratingValues.map((rating, i) => (
                            <a style={{cursor: "pointer", marginRight: "5px"}}
                            key={i} onClick={(e) => this.onStarClicked(e, rating)}>
                                {
                                    rating <= this.state.currentRating ? 
                                    <FillStarIcon /> : <StarIcon />
                                }
                            </a>
                        ))
                    }
                    </div>
                    <textarea rows="5" className="form-control" cols="50" value={this.state.ratingText}
                      onChange={(e) => this.setState({ratingText: e.target.value})}
                      style={{marginBottom: "10px"}} />
                    <button style={{marginBottom: "10px"}} className="btn btn-primary btn-block" onClick={this.postComment}>Rate</button>
                </div>
                <h4 style={{marginBottom: "10px"}}>Ratings</h4>
                <Ratings ratings={this.state.ratings} />
            </div>
        )
    }
}

function WithNavigate(props) {
    let navigate = useNavigate();
    return <Ad {...props} navigate={navigate} />
}
  
export default WithNavigate