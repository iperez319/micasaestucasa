/* global google */
import React, { Component } from 'react';
import { Form, Icon, Input, Select, InputNumber, AutoComplete } from 'antd';
import { throttle, debounce } from 'throttle-debounce'
import _ from 'lodash'

class BasicForm extends Component{
    constructor(props) {
        super(props);
        this.state = { address: "testing", dataSource: [], lat: -100, lng: -100, originialDataSource: [], mainText: "", city: ""}
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
        var obj = _.find(this.state.originialDataSource, (value) => {
          return e == value.description
        })
        this.setState({mainText: obj.structured_formatting.main_text})
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({ 'address': e}, (results, status) => {
            if (status == google.maps.GeocoderStatus.OK) {
              const lat = results[0].geometry.location.lat()
              const lng = results[0].geometry.location.lng()
              const city = _.find(results[0].address_components, (value) => {
                return value.types.includes('locality')
              }).long_name
              this.setState({lat, lng, city})
            }
        })
      }
      changeDataSource = (predictions, status) => {
        // console.log(predictions)
        if (status != google.maps.places.PlacesServiceStatus.OK) {
          alert(status);
          return;
        }
        
        var result = predictions.map((value) => {
          return value.description
        })
  
        this.setState({dataSource: result})
        this.setState({originialDataSource: predictions})
  
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
        return (
            <Form>
              <Form.Item label="Home Type">
                {getFieldDecorator('homeType', {
                rules: [{ required: true, message: 'Please input the type of property you are looking for!' }],
                })(
                <Select placeholder="Select the type of your property">
                <Option value="Any">Any</Option>
                  <Option value="Apartment">Apartment</Option>
                  <Option value="House">House</Option>
                  <Option value="Secondary Unit">Secondary Unit</Option>
                  <Option value="Unique Space">Unique Space</Option>
                  <Option value="Bed And Breakfast">Bed and Breakfast</Option>
                  <Option value="Boutique Hotel">Boutique Hotel</Option>
                </Select>,
                )}
              </Form.Item>
              <Form.Item label="Number of Guests">
                {getFieldDecorator('numberOfGuests', {
                rules: [{ required: true, message: 'Please input the number of guests in your party!' }],
                })(
                <InputNumber prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="# of Guests" min={1}
                />,
                )}
              </Form.Item>
              <Form.Item label="Near to">
                {getFieldDecorator('nearTo', {
                rules: [{ required: true, message: 'Please input where do you want your property be near of!' }],
                })(
                  <AutoComplete
                  value={this.state.address}
                  dataSource={this.state.dataSource}
                  onChange={this.handleChange}
                  onSelect={this.onSelect}
                  placeholder="Write a place"
                  lat={this.state.lat}
                  lng={this.state.lng}
                  mainText={this.state.mainText}
                  city={this.state.city}
                  />,
                )}
              </Form.Item>
            </Form>
        )
            }
}

export default Form.create({name: "BasicForm"})(BasicForm)
