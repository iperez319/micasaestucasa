import React, { Component } from 'react'
import { Input, Button, Form, message } from 'antd'
import { Central } from 'radiks'
import {MyContext} from 'components/User/UserProvider'
class BillingPage extends Component{
    handleSubmit = async (e) => {
        e.preventDefault()
        message.loading('Uploading API key', 0)
        this.props.form.validateFieldsAndScroll(async (err, values) => {
            if(!err){
                const { username } = this.context.state.currentUser
                console.log(username)
                await Central.save('apiKey', {'key' :  values.apiKey})
                message.destroy()
                message.success('Done')
            }
        })
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Item label="OpenNode API Key">
                {getFieldDecorator('apiKey', {
                rules: [{ required: true, message: 'Please input your API Key!' }],
                })(
                <Input placeholder="Write you API Key"/>,
                )}
              </Form.Item>
              <Form.Item>
                  <Button type="primary" htmlType="submit">Submit</Button>
              </Form.Item>      
            </Form>
        )
    }
}
BillingPage.contextType = MyContext
export default Form.create({name: "BillingPage"})(BillingPage)