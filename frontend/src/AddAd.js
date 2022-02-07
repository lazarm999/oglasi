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
        categories: ["c1", "c2"],
        locations: ["l1","l2"],
        invalidAdInput: "",
        photoFiles: []
      }
      this.fetchCategories = this.fetchCategories.bind(this)
      this.fetchLocations = this.fetchLocations.bind(this)
      this.addAd = this.addAd.bind(this)
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

    addAd(e){
      e.preventDefault()
      let that = this
      console.log(this.state.location)
      if(this.state.title === "" || this.state.location === "" || this.state.category === "") {
        this.setState({invalidAdInput: 'You need to fill all fields marked with *'}); 
        return
      }
      /*let formData = new FormData()
      let album = this.state.albumFiles
      formData.append("albumName", this.state.albumName);
      formData.append("songCount", this.state.albumFiles.length);
      formData.append("song" + counter, album[counter])
      formData.append("songsInfo", JSON.stringify(songsInfoList));
      axios.post('http://localhost:3030/uploadAlbum/', formData, {
          headers: {
              'Authorization': localStorage.getItem('token'),
              'Content-type': 'multipart/form-data'
          }
      })*/
      axios.post('http://localhost:3030/ad/', {
        title: this.state.title,
        location: this.state.location,
        category: this.state.category,
        price: this.state.price,
        exchange: document.querySelector('.exchangeCb').checked,
        description: this.state.description
      }// umesto ovog parametra treba da ide formdata
      ,{
        headers: {
            'Content-type': 'multipart/form-data'
        }
      })
      .then(function (response) {
          if(response.status === 200)
              that.props.navigate('/addAd')
      })
      .catch(function (error) {
          let data = error.response.data
          if (error.response.status === 400) 
              that.setState({invalidAdInput: data.message})
      });
    }

    render() {
        return (
          <div className="row container offset-md-2 col-md-8">
            <form className="col-md-10 offset-md-2">
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
                      <select id="addAdLocations" className="form-control" name="locations" 
                        onChange={(e) => this.setState({location: e.target.value})}>
                        {this.state.locations.map((location, i)=>(
                          <option key={i} value={location}>{location}</option>
                        ))}
                      </select>
                  </div>

                  <div className="col-md-3">
                    <label>Category *</label>
                      <select id="addAdCategories" className="form-control" name="categories"
                        onChange={(e) => this.setState({category: e.target.value})}>
                        {this.state.categories.map((category, i)=>(
                          <option key={i} value={category}>{category}</option>
                        ))}
                      </select>
                  </div>

                  <div className="col-md-3">
                      <label>Price</label>
                      <input type="number" className="form-control"
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
                  <input id="photoFiles" multiple accept="image/*" type="file" 
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
  let navigate = useNavigate();
  return <AddAd {...props} navigate={navigate} />
}

export default WithNavigate