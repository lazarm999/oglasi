import { Component } from "react"
import { useNavigate } from "react-router-dom"
import "react-responsive-carousel/lib/styles/carousel.min.css" // requires a loader
import { Carousel } from 'react-responsive-carousel'
import './Ad.css'
import { StarIcon, FillStarIcon } from './Utility'
import Modal from 'react-bootstrap/Modal';

class Ad extends Component{
    constructor(){
        super()
        this.state = {
            ratings: [1],
            ad: {},
            ratingText: "",
            ratingValues: [1, 2, 3, 4, 5],
            currentRating: 0,
            showOrderModal: false
        }
        this.onStarClicked = this.onStarClicked.bind(this)
    }

    fetchAd(){

    }

    fetchRatings(){

    }

    openOrderModal(){

    }

    onStarClicked(e, rating){
        this.setState({
            currentRating: rating
        })
    }

    makeOrder(){

    }

    render(){
        return(
            <div className="row col-md-6 offset-md-3" 
                style={{backgroundColor: "white", display: "flex"}}>
                <Modal show={this.state.showOrderModal} onHide={() => this.setState({showOrderModal: false})}>
                    <Modal.Header closeButton>
                        <Modal.Title>Rate</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={this.makeOrder}>
                            Make order
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
                    <button style={{marginTop: "20px"}} id="addAdBtn" type="submit" className="btn btn-warning btn-block" 
                        onClick={this.openOrderModal}>Order</button>
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
                <h4>Ratings</h4>
                {
                    this.state.ratings.map((e, i) =>
                        <div key = {i} className="ratingContainer">
                            <a href={"/profile/"} style={{textDecoration: "none"}}>
                                <p style={{marginBottom: "0px", display: "inline"}}>{"@" + "Lazar Minic"}</p>
                            </a>
                            <p style={{marginTop: "0px", fontSize: "15px", display: "inline"}}> • 5 stars</p>
                            <p>Ovo je jedan jako zanimljiv komentar</p>
                        </div>
                    )
                }
            </div>
        )
    }
}

function WithNavigate(props) {
    let navigate = useNavigate();
    return <Ad {...props} navigate={navigate} />
}
  
  export default WithNavigate