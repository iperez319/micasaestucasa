import React, { Component } from 'react';
import { Form, Icon, Input, Select, InputNumber, Slider } from 'antd';

class BasicsForm extends Component{
    componentDidMount(){
      const { state } = this.props
      const { setFields } = this.props.form

      const keys = Object.keys(state)

      for(var key in keys){
        setFields({[keys[key]]: {value: state[keys[key]], error: []}})
      }
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        const { Option } = Select
        return (
            <Form>
              <Form.Item label="Home Type">
                {getFieldDecorator('homeType', {
                rules: [{ required: true, message: 'Please input your property type!' }],
                })(
                <Select placeholder="Select the type of your property">
                  <Option value="Apartment">Apartment</Option>
                  <Option value="House">House</Option>
                  <Option value="Secondary Unit">Secondary Unit</Option>
                  <Option value="Unique Space">Unique Space</Option>
                  <Option value="Bed And Breakfast">Bed and Breakfast</Option>
                  <Option value="Boutique Hotel">Boutique Hotel</Option>
                </Select>,
                )}
              </Form.Item>
              <Form.Item label="Accomodates">
                {getFieldDecorator('numberOfGuests', {
                rules: [{ required: true, message: 'Please input the number of guests your property can accomodate!' }],
                })(
                <InputNumber prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="# of Guests" min={1}
                />,
                )}
              </Form.Item>
              <Form.Item label="City">
                {getFieldDecorator('cityName', {
                rules: [{ required: true, message: 'Please input the city of your property!' }],
                })(
                <Input prefix={<Icon type="environment" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Name of city"
                />,
                )}
              </Form.Item>
              <Form.Item label="Price">
                {getFieldDecorator('price', {
                rules: [{ required: true, message: 'Please input the range of prices!' }],
                })(
                <Slider range max={1000} step={5}/>,
                )}
              </Form.Item>
            </Form>
        )
            }
}

export default Form.create({name: "BasicsForm"})(BasicsForm)
