import React from "react";
import { useNavigate } from "react-router-dom";
import { OrdersList } from "./Utility";
import {  } from "react";

class Orders extends React.Component {
    constructor(){
        super()
        this.state = {
            orders: [1, 2]
        }
    }

    fetchOrders(){

    }

    changeOrderState(e, newState){

    }

    render(){
        return(
            <div className="col-md-4 offset-md-4">
                <OrdersList orders={this.state.orders} isMyOrders={this.props.isMyOrders}/>
            </div>
        )
    }
}

function WithNavigate(props) {
    let navigate = useNavigate();
    return <Orders {...props} navigate={navigate} />
}
  
export default WithNavigate