import React, { Component } from 'react'
import Property from 'models/Property'
import PropertyView from 'components/PropertyView'

class PropertyViewPage extends Component{
    state = {
        property: {}
    }
    async componentDidMount(){
        const { propertyId } = this.props.match.params
        
        const property = await Property.findById(propertyId)
        const attrs = property

        this.setState({
            property
        })
    }
    render(){
        return this.state.property.attrs != undefined 
        ? <PropertyView property={this.state.property}/>
        : null
    }

}

export default PropertyViewPage