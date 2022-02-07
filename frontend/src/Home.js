import { Component } from "react";
import { useNavigate } from "react-router-dom";
import './Home.css';
import { fetchCategories, fetchLocations } from "./Utility";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            locations: ["Location"],
            categories: ["Category"],
            location: "",
            category: "",
            price: 0,
            searchText: "",
            ads: ["", "", ""]
        };
    }

    componentDidMount(){
        /*fetchCategories((data) => {
            console.log(data)
        }, (error) => {
            console.log(error)
        })
        fetchLocations((data) => {
            console.log(data)
        }, (error) => {
            console.log(error)
        })*/
    }

    render(){
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
                                <span className="desc">Advanced Search</span>
                                <div className="row">
                                    <div className="col-md-8">
                                        <div className="row">
                                            <div className="col-md-4">
                                                <div className="input-select">
                                                <select id="searchLocations" className="form-control" name="locations" 
                                                    onChange={(e) => this.setState({location: e.target.value})}>
                                                    {this.state.locations.map((location, i)=>(
                                                    <option key={i} value={location}>{location}</option>
                                                    ))}
                                                </select>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="input-select">
                                                <select id="searchCategories" className="form-control" name="categories" 
                                                    onChange={(e) => this.setState({category: e.target.value})}>
                                                    {this.state.categories.map((location, i)=>(
                                                    <option key={i} value={location}>{location}</option>
                                                    ))}
                                                </select>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="input-select">
                                                <input type="number" className="form-control" placeholder="Price"
                                                    onChange={(e) => this.setState({price: e.target.value})}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="row">
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
                        </div>
                    </form>
                    <div className="card col-md-12" id="homeAdsContainer">
                    {
                        this.state.ads.map((ad, i) => (
                            <div key={i} className="row">
                                <div className="col-md-3">
                                    <img src="defaultProduct.png" alt="Girl in a jacket" width="100" height="100"/>
                                </div>
                                <div className="col-md-4">
                                    <div className="col-md-12"><h4>Ovo je naslov</h4></div>
                                    <div className="col-md-12">Ovo je opis ovog divnog proizvoda...</div>
                                </div>
                                <div className="col-md-3"><p>1500 din.</p></div>
                                <div className="col-md-2"><p>Krusevac</p></div>
                                <hr style={{width: "95%", margin: "5px auto"}}/>
                            </div>
                        ))
                    }
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