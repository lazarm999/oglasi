import { Component } from "react"
import { useNavigate } from "react-router-dom"
import './AddAd.css'
import axios from 'axios'

class AddAd extends Component {
    constructor(props) {
      super(props);
      this.state = {
        title: "",
        description: "",
        exchange: false,
        location: "",
        category: "",
        price: 0,
        categories: [],
        locations: []
      }
      this.fetchCategories = this.fetchCategories.bind(this)
      this.fetchLocations = this.fetchLocations.bind(this)
    }

    fetchCategories(){
      let that = this
      axios.get("http://localhost:3030/categories/")
        .then(function (response) {
            let data = response.data.data
            console.log(data)
            if(response.status === 200) {
                that.setState({
                    categories: data
                })
            }
        })
        .catch(function (error) {
          console.log(error)
        });
    }

    fetchLocations(){
      let that = this
      axios.get("http://localhost:3030/locations/")
      .then(function (response) {
          let data = response.data.data
          console.log(data)
          if(response.status === 200) {
              that.setState({
                  locations: data
              })
          }
      })
      .catch(function (error) {
        console.log(error)
      });
    }

    render() {
        return (
          <div className="row container" >
            <form>
                <h3>Add ad</h3>

                <div className="form-group">
                    <label>Title *</label>
                    <input type="text" className="form-control"  value={this.state.firstName}
                            onChange={(e) => this.setState({firstName: e.target.value})}/>
                </div>

                <div className="form-group">
                    <label>Description</label>
                    <textarea rows="4" className="form-control" cols="50"/>
                </div>

                <div className="form-group">
                    <label>Location</label>
                    <select id="addAdlocations" className="form-control" style={{width: "200px"}} name="cars">
                      {this.state.categories.map((location)=>{
                        <option value={location}>{location}</option>
                      })}
                    </select>
                </div>

                <div className="form-group">
                    <label>Email address *</label>
                    <input type="email" className="form-control" placeholder="Enter email" 
                    onChange={(e) => this.setState({email: e.target.value})}/>
                </div>

                <div className="form-group">
                    <label>Password *</label>
                    <input type="password" className="form-control regInput" placeholder="Enter password" 
                     onChange={(e) => this.setState({password: e.target.value})}/>
                </div>

                <div>
                    <p id = "invalidRegInput" 
                       style = {{display: this.state.invalidRegInput === "" ? 'none' : 'block'}}>
                            {this.state.invalidRegInput}</p>
                </div>

                <button id="regBtn" type="submit" className="btn btn-primary btn-block" onClick={this.register}>Sign Up</button>
            </form>
          </div>
        );
    }
}

function WithNavigate(props) {
  let navigate = useNavigate();
  return <AddAd {...props} navigate={navigate} />
}

export default WithNavigate