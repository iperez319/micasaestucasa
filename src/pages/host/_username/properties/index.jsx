import React, { Component } from 'react'
import Property from 'models/Property'
import { withRouter } from 'react-router-dom'
import PropertyGrid from 'components/PropertyGrid'
import {MyContext} from 'components/User/UserProvider'


class HostViewProperties extends Component{
    state = {
        properties: []
    }
    async componentDidMount (){
        // const property = new Property({
        //     name: "Bungalow near the Beach",
        //     host: "Ian",
        //     host_email: "iancarloperez@gmail.com",
        //     location: "Macao, China",
        //     locationDescription: "Near the busling markets, the casinos, and the beautiful monuments dedicated to the great Ching Pin",
        //     exactLocation: "1.28293872,-93.3487283",
        //     amenities: "Wifi, Tools, Utilities, Essentials, Iron, Personal Chef",
        //     checkIn: "12:00PM",
        //     checkOut: "2:00PM",
        //     maxRange: 400,
        //     minRange: 200
        // })
        // await property.save();

        const properties = await Property.fetchOwnList()
        console.log(properties)
        this.setState({properties: properties})
    }
    render(){
        return (
            <div>
            <PropertyGrid properties={this.state.properties}/>
            </div>
        );
    }
}
HostViewProperties.contextType = MyContext
export default withRouter(HostViewProperties)