import axios from 'axios'

export function fetchCategories(onSuccess, onError){
    axios.get("http://localhost:3030/categories/")
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
    axios.get("http://localhost:3030/locations/")
    .then(function (response) {
        let data = response.data.data
        if(response.status === 200) 
            onSuccess(data)
    })
    .catch(function (error) {
        onError(error)
    });
}