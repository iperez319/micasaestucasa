import React, { Component } from 'react'
import Property from 'models/Property'
import GuestPropertyView from 'components/GuestPropertyView'

class GuestPropertyViewPage extends Component{
    state = {
        property: {}
    }
    async componentDidMount(){
        console.log("Opening GuestPropertyViewPage")
        const { propertyId } = this.props.match.params
        
        const property = await Property.findById(propertyId)
        const attrs = property

        this.setState({
            property
        })
    }
    render(){
        return this.state.property.attrs != undefined 
        ? <GuestPropertyView property={this.state.property}/>
        : null
    }

}

export default GuestPropertyViewPage