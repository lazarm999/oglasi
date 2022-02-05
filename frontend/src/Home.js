import { Component } from "react";
import { useNavigate } from "react-router-dom";
import './Home.css';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount(){
    }

    render(){
        return(
        <div className="padding">
            <div className="col-md-8 offset-md-2">
                <h3>Home</h3>
            </div>
        </div>
        )
    }
}

function WithNavigate(props) {
    let navigate = useNavigate();
    return <Home {...props} navigate={navigate} />
  }
  
  export default WithNavigate