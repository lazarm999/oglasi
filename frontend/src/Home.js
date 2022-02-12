import { Component } from "react";
import { useNavigate } from "react-router-dom";
import './Home.css';
import { Locations, Categories, Ads } from "./Utility";
import axios from 'axios'

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location: "",
            category: "",
            from: "",
            to: "",
            searchText: "",
            sortBy: "",
            sortByIndex: 1,
            ads: [],
            sortByList: ["Price", "Date", "User's rating"],
            sortByParams: ["sortPrice", "sortTime", "sortRating"],
            order: "desc",
            page: 1,
            count: -1
        }
        this.fetchAds = this.fetchAds.bind(this)
        this.resetSearchParams = this.resetSearchParams.bind(this)
    }

    componentDidMount(){
        this.fetchAds(null, false)
    }

    fetchAds(e, loadMore){
        if(e) e.preventDefault()
        let that = this
        let params = {
            ...this.state.category !== "" && { category: this.state.category},
            ...this.state.location !== "" && { location: this.state.location},
            ...this.state.from !== "" && { priceLow: this.state.from},
            ...this.state.to !== "" && { priceHigh: this.state.to},
            ...this.state.searchText !== "" && { search: this.state.searchText},
            page: loadMore ? this.state.page : 1
        }
        params[this.state.sortByParams[this.state.sortByIndex]] = this.state.order
        axios.get('http://localhost:3030/ads/', {
            params: params
        })
        .then(function (response) {
            let data = response.data.data
            let count = response.data.count
            if(response.status === 200) {
                that.setState((prevState) =>({
                    ads: loadMore ? [...prevState.ads, ...data] : data,
                    page: loadMore ? prevState.page + 1 : 2,
                    count: count
                }))
            }
        })
        .catch(function (error) {
            console.log(error)
        });
    }

    resetSearchParams(){
        window.location.reload()
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
                                    <span>{this.state.count < 0 ? 0 : this.state.count} </span>results</div>
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
                                        <select className="form-control" name="sortBy" defaultValue={""}
                                            onChange={(e) => {
                                                this.setState({
                                                    sortBy: e.target.value,
                                                    sortByIndex: e.target.selectedIndex - 1
                                                })
                                            }}>
                                            <option value="" disabled hidden>Sort by...</option>
                                            {
                                                this.state.sortByList.map((sortBy, i)=>(
                                                    <option key={i} value={sortBy}>{sortBy}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                    <div className="row col-md-4">
                                        <div className="col-md-5">
                                            <input type="radio" name="order" value="asc" defaultChecked = {true}
                                               onChange={(e) => this.setState({order: e.target.value})}/>
                                            <label style={{marginLeft: "5px"}}>Asc</label>
                                        </div>
                                        <div className="col-md-5">
                                            <input type="radio" name="order" value="desc"
                                                onChange={(e) => this.setState({order: e.target.value})}/>
                                            <label style={{marginLeft: "5px"}}>Desc</label>
                                        </div>
                                    </div>
                                    <div className="row col-md-4" style={{marginTop: "10px"}}>
                                        <div className="col-md-6">
                                            <button className="btn-search" onClick={(e) => this.fetchAds(e, false)}>Search</button>
                                        </div>
                                        <div className="col-md-6">
                                            <button className="btn-delete" onClick={this.resetSearchParams} id="delete">Reset</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                    <div className="card col-md-12" id="homeAdsContainer">
                        <Ads ads={this.state.ads} />
                        <p style={{cursor: "pointer", textAlign: "center", margin: "10px auto", color: "#4A8BE3", fontWeight: "bold"}}
                            onClick={(e) => this.fetchAds(e, true)}>Load more...</p>
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