import { Component } from "react"
import { useNavigate } from "react-router-dom"
import './AddAd.css'
import axios from 'axios'
import { Locations, Categories } from "./Utility";

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
        invalidAdInput: "",
        photoFiles: {}
      }
      this.addAd = this.addAd.bind(this)
    }

    addAd(e){
      e.preventDefault()
      let that = this
      if(this.state.title === "" || this.state.location === "" || this.state.category === "") {
        this.setState({invalidAdInput: 'You need to fill all fields marked with *'})
        return
      }
      
      let formData = new FormData()
      if(this.state.photoFiles[0] !== undefined)
        for(let i = 0; i < this.state.photoFiles.length; i++)
          formData.append("pictures", this.state.photoFiles[i])
      formData.append("data", JSON.stringify({
        title: this.state.title,
        location: this.state.location,
        category: this.state.category,
        price: this.state.price,
        exchange: document.querySelector('.exchangeCb').checked,
        description: this.state.description
      }))
      axios.post('http://localhost:3030/postAd/', formData, {
          headers: {
              'Content-type': 'multipart/form-data'
          }
      })
      .then(function (response) {
        if(response.status === 201)
          window.location.reload()
      })
      .catch(function (error) {
        let data = error.response.data
        if (error.response.status === 400) 
            that.setState({invalidAdInput: data.message})
      });
    }

    render() {
        return (
          <div className="row container offset-md-3 col-md-6" 
            style={{backgroundColor: "#f2f1ed", paddingBottom: "30px", paddingTop: "30px", 
            minHeight: "600px", borderRadius: "10px"}}>
            <form className="col-md-10 offset-md-2" >
                <h3>Add ad</h3>
                <div className="form-group col-md-8">
                    <label>Title *</label>
                    <input type="text" className="form-control"  value={this.state.title}
                            onChange={(e) => this.setState({title: e.target.value})}/>
                </div>
                <div className="form-group col-md-8">
                    <label>Description</label>
                    <textarea rows="6" className="form-control" cols="50" value={this.state.description}
                      onChange={(e) => this.setState({description: e.target.value})}/>
                </div>
                <div className="row" style={{display: "flex", justifyContent: "space-between"}}>
                  <div className="col-md-3">
                      <label>Location *</label>
                      <Locations setLocation = {(location) => this.setState({location: location})} />
                  </div>

                  <div className="col-md-3">
                    <label>Category *</label>
                    <Categories setCategory = {(category) => this.setState({category: category})} />
                  </div>

                  <div className="col-md-3">
                      <label>Price</label>
                      <input type="number" className="form-control" min="0" value={this.state.price}
                        onChange={(e) => this.setState({price: e.target.value})}/>
                  </div>

                  <div className="col-md-3" style={{paddingTop: "30px"}}>
                    <input className = "exchangeCb" type="checkbox" name="exchangeCb"/>
                    <label style={{marginLeft: "5px"}}>Exchange</label>
                  </div>
                </div>

                <div>
                  <p id = "invalidAdInput" style = {{display: this.state.invalidAdInput === "" ? 'none' : 'block'}}>
                    {this.state.invalidAdInput}
                  </p>
                </div>
                <div className="col" style={{marginTop: "10px"}}>
                  <h5>Upload photos:</h5>
                  <input id="photoFiles" multiple accept=".png,.jpeg,.jpg" type="file" style={{marginTop: "10px"}}
                    onChange={(e) => this.setState({photoFiles: e.target.files})}/>
                </div>
                <button style={{marginTop: "20px"}} id="addAdBtn" type="submit" className="btn btn-warning btn-block" 
                  onClick={this.addAd}>Submit</button>
            </form>
          </div>
        );
    }
}

function WithNavigate(props) {
  let navigate = useNavigate()
  return <AddAd {...props} navigate={navigate} />
}

export default WithNavigate