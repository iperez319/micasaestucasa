/* global google */
import React, { Component } from 'react';
import { Form, Icon, Input, Select, InputNumber, Slider, AutoComplete } from 'antd';
import { throttle, debounce } from 'throttle-debounce'

class SettingsForm extends Component{
    constructor(props) {
      super(props);
      this.state = { address: "testing", dataSource: [], lat: -100, lng: -100}
      this.autocompleteSearchDebounced = debounce(500, this.autocompleteSearch);
      this.autocompleteSearchThrottled = throttle(500, this.autocompleteSearch);
    }
  
    componentDidMount(){
      const { state } = this.props
      const { setFields } = this.props.form

      const keys = Object.keys(state)

      for(var key in keys){
        setFields({[keys[key]]: {value: state[keys[key]], error: []}})
      }
    }

    onSelect = (e) => {
      var geocoder = new google.maps.Geocoder();
      geocoder.geocode({ 'address': e}, (results, status) => {
          if (status == google.maps.GeocoderStatus.OK) {
            console.log(results)
            const lat = results[0].geometry.location.lat()
            const lng = results[0].geometry.location.lng()
            this.setState({lat, lng})
          }
      })
    }

    changeDataSource = (predictions, status) => {
      if (status != google.maps.places.PlacesServiceStatus.OK) {
        alert(status);
        return;
      }
      
      var result = predictions.map((value) => {
        return value.description
      })

      this.setState({dataSource: result})

    }

    autocompleteSearch = (query) => {
      const autocompleteService = new google.maps.places.AutocompleteService()

      autocompleteService.getPlacePredictions({
        input: query
      },
      this.changeDataSource);
    }

    handleChange = (e) => {
      if(e.length < 5){
        this.autocompleteSearchThrottled(e)
      }
      else{
        this.autocompleteSearchDebounced(e)
      }
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        const { Option } = Select
        const amenitiesList = ["Clean linens", "Toilet paper", "Towels", "Wifi", "Iron", "Ironing Board", "Universal charging station", "One key per bedroom", "Desk supplies", "Printer", "Ear plugs", "International power adapter", "Ethernet cable"]
        const amenitiesOptions = []
        for(var amenity in amenitiesList){
            var currAm = amenitiesList[amenity]
            amenitiesOptions.push(<Option key={currAm}>{currAm}</Option>)
        }
        
        return (
            <Form>
              <Form.Item label="Amenities">
                {getFieldDecorator('amenities', {
                rules: [{ required: true, message: 'Please input the ammenities of your property!' }],
                })(
                <Select mode="tags" placeholder="Select the type of your property's amenities">
                  {amenitiesOptions}
                </Select>,
                )}
              </Form.Item>
              <Form.Item label="Beds">
                {getFieldDecorator('beds', {
                rules: [{ required: true, message: 'Please input the number of beds in your property!' }],
                })(
                <InputNumber placeholder="# of Beds" min={1}/>,
                )}
              </Form.Item>
              <Form.Item label="Street Address">
                {getFieldDecorator('streetAddress', {
                rules: [{ required: true, message: 'Please input the city of your property!' }],
                })(
                  <AutoComplete
                  value={this.state.address}
                  dataSource={this.state.dataSource}
                  onChange={this.handleChange}
                  onSelect={this.onSelect}
                  placeholder="Write the street address"
                  lat={this.state.lat}
                  lng={this.state.lng}
                  />,
                )}
              </Form.Item>
            </Form>
        )
            }
}

export default Form.create({name: "SettingsForm"})(SettingsForm)
