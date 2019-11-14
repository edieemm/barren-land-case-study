import React, {Component} from 'react';
import Axios from 'axios';

class Client extends Component {
    handleChange = (event) => {
        this.setState({
            ...this.state,
            productID: event.target.value
        })
    }
    handleSubmit = () => {
        // Axios.get(`/product/${this.state.productID}`)
        Axios.get(`http://localhost:5000/product/${this.state.productID}`)
        .then(response => {
            this.setState({
                data: response.data
            })
        }).catch(error => {
            console.log(error)
        })
    }
    render() {
        return (
            <>
            <input placeholder='product id #' onChange={this.handleChange} />
            <button onClick={this.handleSubmit}>Submit</button> <br/>
            {this.state ? JSON.stringify(this.state.data) : 'Please enter a product ID'}
            </>
        )
    }
}

export default Client;