import { Component } from "react";
import { useNavigate } from "react-router-dom";
import './Home.css';
import { Locations, Categories, Ads } from "./Utility";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location: "",
            category: "",
            from: 0,
            to: 0,
            searchText: "",
            sortBy: "",
            ads: ["", "", ""],
            sortByList: ["Price", "Date", "User's rating"]
        };
    }

    componentDidMount(){
    }

    render(){
        console.log(this.state.location)
        return(
        <div className="padding">
            <div className="col-md-8 offset-md-2">
                <div className="s007 row">
                    <form className="col-md-12">
                        <div className="inner-form">
                            <div className="basic-search">
                                <div className="input-field">
                                <div className="icon-wrap">
                                </div>
                                <input id="search" type="text" placeholder="Search..." 
                                    onChange={(e) => this.setState({searchText: e.target.value})}/>
                                <div className="result-count">
                                    <span>{this.state.ads.length} </span>results</div>
                                </div>
                            </div>
                            <div className="advanced-search">
                                <h4>Advanced search</h4>
                                <div className="row">
                                    <div className="col-md-3">
                                        <div className="input-select">
                                            <Locations setLocation = {(location) => this.setState({location: location})} />
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="input-select">
                                            <Categories setCategory = {(category) => this.setState({category: category})} />
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="input-select">
                                        <input type="number" className="form-control" placeholder="From"
                                            onChange={(e) => this.setState({from: e.target.value})}/>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="input-select">
                                        <input type="number" className="form-control" placeholder="To"
                                            onChange={(e) => this.setState({to: e.target.value})}/>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <select className="form-control" name="sortBy" placeholder="Sort by"
                                            onChange={(e) => this.setState({sortBy: e.target.value})}>
                                            <option value="" disabled selected>Sort by</option>
                                            {
                                                this.state.sortByList.map((sortBy, i)=>(
                                                    <option key={i} value={sortBy}>{sortBy}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                    <div className="row col-md-4" style={{marginTop: "10px"}}>
                                            <div className="col-md-6">
                                                <button className="btn-search">Search</button>
                                            </div>
                                            <div className="col-md-6">
                                                <button className="btn-delete" id="delete">Reset</button>
                                            </div>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </form>
                    <div className="card col-md-12" id="homeAdsContainer">
                        <Ads ads={this.state.ads} />
                    </div>
                </div>
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