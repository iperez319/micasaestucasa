import React, { Component } from 'react'
import { GoogleMap, Marker, withGoogleMap, Circle } from "react-google-maps"

class MapContainer extends Component{
  render(){
    return (<GoogleMap
    defaultZoom={14}
    defaultCenter={{ lat: this.props.lat, lng: this.props.lng }}>
    {
      this.props.guest 
        ? <Circle defaultCenter={{ lat: this.props.lat, lng: this.props.lng }} radius={500} options={{fillColor: "#FF9831", strokeColor: '#FF9831'}}/>
        : <Marker position={{ lat: this.props.lat, lng: this.props.lng }} />
    }
    
  </GoogleMap>)
  }
  
}

export default withGoogleMap(MapContainer)