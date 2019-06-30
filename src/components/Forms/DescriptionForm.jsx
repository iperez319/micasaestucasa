import React, { Component } from 'react';
import { Form, Icon, Input, Select, InputNumber, Slider, Upload, Modal } from 'antd';

class DescriptionForm extends Component{
    state= {
        previewVisible: false,
        previewImage: '',
        fileList: [],
    }
    getBase64 = (file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = error => reject(error);
        });
      }
    componentDidMount(){
      const { state } = this.props
      const { setFields } = this.props.form

      const keys = Object.keys(state)
      for(var key in keys){
        setFields({[keys[key]]: {value: state[keys[key]], error: []}})
      }
      this.setState({fileList: state.fileList || []})
    }
    handleCancel = () => this.setState({ previewVisible: false });

    handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await this.getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

    handleChange = ({ fileList }) => {
        this.setState({ fileList })
    };
    render(){
        const { getFieldDecorator } = this.props.form;
        const { previewVisible, previewImage, fileList } = this.state;
        const { TextArea } = Input
        const uploadButton = (
            <div>
              <Icon type="plus" />
              <div style={{marginTop: "8px", color: "#666"}}>Upload</div>
            </div>
          );
        return (
            <Form>
                <Form.Item label="Title">
                {getFieldDecorator('title', {
                rules: [{ required: true, message: 'Please input the title of your property!' }],
                })(
                <Input placeholder="Write a title"/>,
                )}
              </Form.Item>
              <Form.Item label="Description">
                {getFieldDecorator('description', {
                rules: [{ required: true, message: 'Please input a description for your property!' }],
                })(
                <TextArea rows={4} placeholder="Describe your property"/>,
                )}
              </Form.Item>
              <Form.Item label="Photos">
                {getFieldDecorator('photos', {
                rules: [{ required: true, message: 'Please upload from 1 to 5 photos of your property!' }],
                })(
                    <div className="clearfix">
                    <Upload
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                  >
                    {fileList.length >= 3 ? null : uploadButton}
                  </Upload>
                  <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
                  </div>,
                )}
              </Form.Item>
            </Form>
        )
            }
}

export default Form.create({name: "DescriptionForm"})(DescriptionForm)
