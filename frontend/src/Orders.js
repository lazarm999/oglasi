import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { OrdersList } from "./Utility";

class Orders extends React.Component {
    constructor(){
        super()
        this.state = {
            orders: []
        }
        this.fetchOrders = this.fetchOrders.bind(this)
        this.findOrderIndexById = this.findOrderIndexById.bind(this)
        this.updateOrderPhase = this.updateOrderPhase.bind(this)
        this.changeOrderState = this.changeOrderState.bind(this)
    }

    componentDidMount(){
        this.fetchOrders()
    }

    fetchOrders(){
        let ordersType = this.props.isMyOrders ? "myOrders" : "orders"
        axios.get("http://localhost:3030/" + ordersType + "/")
        .then((response) => {
            let data = response.data.data
            console.log(data)
            if(response.status === 200) {
                this.setState({
                    orders: data
                })
            }
        })
        .catch(function (error) {
            console.log(error)
        });
    }

    changeOrderState(e, nextPhase, orderId){
        e.preventDefault()
        let url = nextPhase === 1 ? "/confirmOrder/" :
            nextPhase === 2 ? "/sendOrder/" : ""
        if(url !== ""){
            axios.post("http://localhost:3030" + url + orderId)
            .then((response) => {
                if(response.status === 200) {
                    this.updateOrderPhase(nextPhase, orderId)
                }
            })
            .catch(function (error) {
                console.log(error)
            })
        } else {
            this.updateOrderPhase(nextPhase, orderId)
        }
    }

    updateOrderPhase(nextPhase, orderId){
        let i = this.findOrderIndexById(orderId)
        let orders = this.state.orders
        orders[i].phase = nextPhase
        this.setState({
            orders: orders
        })
    }

    findOrderIndexById(orderId){
        let res = 0
        this.state.orders.forEach((el, i) => { 
            if(el._id === orderId) res = i
        })
        return res
    }

    render(){
        return(
            <div className="col-md-4 offset-md-4">
                <OrdersList orders={this.state.orders} isMyOrders={this.props.isMyOrders}
                    changeOrderState={this.changeOrderState}/>
            </div>
        )
    }
}

function WithNavigate(props) {
    let navigate = useNavigate();
    return <Orders {...props} navigate={navigate} />
}
  
export default WithNavigate