import React, { Component } from 'react';
import { Form, Icon, InputNumber, DatePicker } from 'antd';
import moment from 'moment'

class OfferForm extends Component{
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
        const { RangePicker } = DatePicker
        const dateFormat = 'YYYY/MM/DD';
        return (
            <Form>
                <Form.Item label="Date">
                {getFieldDecorator('date', {
                rules: [{ required: true, message: 'Please input the date of your proposed stay!' }],
                })(
                <RangePicker format={dateFormat}/>,
                )}
              </Form.Item>
              <Form.Item label="Price">
                {getFieldDecorator('price', {
                rules: [{ required: true, message: 'Please input the number of guests your property can accomodate!' }],
                })(
                    <InputNumber
                    min={1}
                    formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                  />,
                )}
              </Form.Item>
            </Form>
        )
            }
}

export default Form.create({name: "OfferForm"})(OfferForm)
