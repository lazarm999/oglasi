import axios from 'axios'
import React from 'react'
import './Utility.css'
import { Steps } from 'rsuite'
import "rsuite/dist/rsuite.min.css"
import { useNavigate, useLocation } from "react-router-dom"

export function fetchCategories(onSuccess, onError){
    axios.get("http://localhost:3030/getCategories/")
    .then(function (response) {
        let data = response.data.data
        if(response.status === 200) 
            onSuccess(data)
    })
    .catch(function (error) {
        onError(error)
    });
}

export function fetchLocations(onSuccess, onError){
    axios.get("http://localhost:3030/getLocations/")
    .then(function (response) {
        let data = response.data.data
        if(response.status === 200) 
            onSuccess(data)
    })
    .catch(function (error) {
        onError(error)
    });
}

export function StarIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-star" viewBox="0 0 16 16">
            <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
        </svg>
    )
}

export function FillStarIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
        </svg>
    )
}

export class Locations extends React.Component{
    constructor(){
        super()
        this.state = {
            locations: []
        }
    }

    componentDidMount(){
        fetchLocations((data) => {
            this.setState({locations: data})
        }, (error) => {
            console.log(error)
        })
    }

    render(){
        return(
            <select className="form-control" name="locations" defaultValue={""}
                onChange={(e) => this.props.setLocation(e.target.value)}>
                <option value="" disabled hidden>Location...</option>
                {
                    this.state.locations.map((location, i)=>(
                        <option key={i} value={location}>{location}</option>
                    ))
                }
            </select>
        )
    }
}

export class Categories extends React.Component{
    constructor(){
        super()
        this.state = {
            categories: []
        }
    }

    componentDidMount(){
        fetchCategories((data) => {
            this.setState({categories: data})
        }, (error) => {
            console.log(error)
        })
    }

    render(){
        return(
            <select className="form-control" name="categories" defaultValue={""}
                onChange={(e) => this.props.setCategory(e.target.value)}>
                <option value="" disabled hidden>Category...</option>
                {
                    this.state.categories.map((category, i)=>(
                        <option key={i} value={category}>{category}</option>
                    ))
                }
            </select>
        )
    }
}

export class Ratings extends React.Component {
    constructor(){
        super()
    }

    render(){
        return(
            <div>
                {
                    this.props.ratings.map((rating, i) =>
                        <div key = {i} className="ratingContainer" style={{backgroundColor: "white"}}>
                            <a href={"http://localhost:3000/profile/" + rating.raterId} style={{textDecoration: "none", fontSize: "medium"}}>
                                <p style={{marginBottom: "0px", display: "inline"}}>{rating.raterName} </p>
                            </a>
                            <p style={{marginTop: "0px", fontSize: "15px", display: "inline"}}>{new Date(rating.time).toLocaleString()}</p>
                            <p style={{marginTop: "0px", fontSize: "15px", display: "inline"}}> • {rating.rating} stars</p>
                            {
                                rating.adId ? 
                                <a href={"http://localhost:3000/ad/" + rating.adId}
                                    style={{textDecoration: "none", fontSize: "medium"}}>
                                    <p style={{marginBottom: "0px"}}>{rating.adTitle} </p>
                                </a> : null
                            }
                            <p style={{fontSize: "medium"}}>{rating.comment}</p>
                        </div>
                    )
                }
            </div>
        )
    }
}

export class Ads extends React.Component {
    constructor(){
        super()
    }

    render(){
        return(
            <div>
                {
                    this.props.ads.map((ad, i) => (
                        <div key={i} className="row" style={{backgroundColor: "white", width: "95%", marginLeft: "2.5%", marginTop: "10px"}}>
                            <div className="col-md-3">
                                <img src= { ad.picturePaths.length === 0 ? "../defaultProduct.png" : "http://localhost:3030/" + ad.picturePaths[0]}
                                    width="100" height="100"/>
                            </div>
                            <div className="col-md-4">
                                <div className="col-md-12">
                                    <a href={"http://localhost:3000/ad/" + ad._id} style={{textDecoration: "none"}}
                                        >
                                        <h4>{ad.title}</h4>
                                    </a>
                                </div>
                                <div className="col-md-12 adDesc">{ad.description}</div>
                            </div>
                            <div className="col-md-3"><p>{ad.price} din.</p></div>
                            <div className="col-md-2"><p>{ad.location}</p></div>
                            <hr style={{width: "95%", margin: "5px auto"}}/>
                        </div>
                    ))
                }
            </div>
        )
    }
}

export class OrdersList extends React.Component {
    constructor(){
        super()
    }

    render(){
        return(
            <div>
                {
                    this.props.orders.map((order, i) => {
                        let orderStateText = order.phase === 0 ? "Confirm order" :
                            order.phase === 1 ? "Product sent" :""
                        return (
                            <div key={i} className="row ordersListContainer" style={{backgroundColor: "white", width: "95%", marginLeft: "2.5%"}}>
                                <div className="col-md-3">
                                    <img src = {order.adPicture === undefined ? "defaultProduct.png" : "http://localhost:3030/" + order.adPicture} 
                                        width="100" height="100"/>
                                </div>
                                <div className="col-md-9">
                                    <a href={"http://localhost:3000/ad/" + order.adId} style={{textDecoration: "none"}}><p>{order.adTitle}</p></a>
                                    <a href={"http://localhost:3000/profile/" + (order.supplierId ? order.supplierId : order.ordererId)} 
                                    style={{textDecoration: "none"}}>
                                        <p>{order.supplierName ? order.supplierName : order.ordererName}</p>
                                    </a>
                                    <p>{order.address}</p>
                                    <p>{order.city}</p>
                                    <p>Quantity: {order.quantity}</p>
                                    <Steps current={order.phase}>
                                        <Steps.Item title="Ordered" />
                                        <Steps.Item title="Confirmed" />
                                        <Steps.Item title="Sent" />
                                    </Steps>
                                    {
                                        this.props.isMyOrders || orderStateText === "" ? null : 
                                        <div>
                                            <a href="#" className="btn btn-outline-primary" style={{marginTop: "10px"}}
                                                onClick={(e) => this.props.changeOrderState(e, order.phase + 1, order._id)}>
                                                {orderStateText}
                                            </a>
                                        </div>
                                    }
                                </div>
                            </div>
                        )})
                }
            </div>
        )
    }
}