/* global google */
import React, { Component } from 'react'
import { Steps, Button, message } from 'antd';
import { MyContext } from 'components/User/UserProvider'
import BasicsForm from 'components/Forms/BasicsForm'
import DescriptionForm from 'components/Forms/DescriptionForm'
import SettingsForm from 'components/Forms/SettingsForm'
import imageCompression from 'browser-image-compression';
import Property from 'models/Property'
import { withRouter } from 'react-router-dom'

class AdminPropertyCreate extends Component {
    state = {
        current: 0
    }
    getBase64 = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      });
    }
    async next() {
      const current = this.state.current + 1;
      switch(this.state.current){
        case 0:
          this.refs.basicsFormChild.validateFields((error, values) => {
            if(!error){
              this.setState({ current })
              this.setState(values)
              
            }
          })
          break;
        case 1:
          this.refs.descriptionFormChild.validateFields(async (error, values) => {
            if(!error){
              this.setState(values)
              var options = {
                maxSizeMB: 0.5,
                maxWidthOrHeight: 1920,
                useWebWorker: true
              }
              var files = this.refs.descriptionFormChild.getFieldProps("photos")["data-__meta"].originalProps.children[0].props.fileList
              for(var file in files){
                var currentFile = files[file]
                if(!currentFile.compressed){
                  console.log("Started")
                  const compressedFile = await imageCompression(currentFile.originFileObj, options);
                  currentFile.preview = await this.getBase64(compressedFile);
                  currentFile.compressed = true
                  console.log("Finished")
                }
              }
              this.setState({current, fileList: files})
              
            }
          })
          break;
          case 2:
            this.refs.settingsFormChild.validateFields((error, values) => {
              if(!error){
                this.setState({ current });
                this.setState(values)
              }
            })
            break

      }
    }
  
    async prev() {
      const current = this.state.current - 1;
      switch(this.state.current){
        case 0:
          this.refs.basicsFormChild.validateFields((error, values) => {
            if(!error){
              this.setState({ current });
              this.setState(values)
            }
          })
          break;
        case 1:
          this.refs.descriptionFormChild.validateFields(async (error, values) => {
            if(!error){
              this.setState(values)
              var options = {
                maxSizeMB: 0.5,
                maxWidthOrHeight: 1920,
                useWebWorker: true
              }
              var files = this.refs.descriptionFormChild.getFieldProps("photos")["data-__meta"].originalProps.children[0].props.fileList
              for(var file in files){
                var currentFile = files[file]
                if(!currentFile.compressed){
                  console.log("Started")
                  const compressedFile = await imageCompression(currentFile.originFileObj, options);
                  currentFile.preview = await this.getBase64(compressedFile);
                  currentFile.compressed = true
                  console.log("Finished")
                }
              }
              this.setState({current, fileList: files})
              
            }
          })
          break;
          case 2:
            this.refs.settingsFormChild.validateFields((error, values) => {
              if(!error){
                this.setState({ current });
                this.setState(values)
              }
            })
            break

      }
    }
    displayForm = (id) => {
      switch(id){
        case 0:
          return <BasicsForm ref="basicsFormChild" state={this.state}/>
          break;
        case 1:
          return <DescriptionForm ref="descriptionFormChild" state={this.state}/>
          break;
        case 2:
          return <SettingsForm ref="settingsFormChild" state={this.state}/>
      }
    }

    secondStep = async (lat, lng) => {
      const { userData, username } = this.context.state.currentUser
      const { history } = this.props
      var imageFiles = this.state.fileList.map((value) => {
        return value.preview
      })
      var newProperty = new Property({
        title: this.state.title,
        description: this.state.description,
        propertyType: this.state.homeType,
        host: username,
        hostEmail: userData.email,
        lat: lat,
        lng: lng,
        location: {
          type: "Point",
          coordinates: [lat, lng]
        },
        streetAddress: this.state.streetAddress,
        city: this.state.cityName,
        numberOfGuests: this.state.numberOfGuests,
        amenities: this.state.amenities,
        maxRange: this.state.price[1],
        minRange: this.state.price[0],
        imageFiles: imageFiles,
        beds: this.state.bed,
        pendingProposals: new Array()
      })
      await newProperty.save()
      message.destroy()
      message.success("Created property")
      history.push(`/host/${username}/properties`)
    }

    firstStep = () => {
      var lat = this.refs.settingsFormChild.getFieldProps("streetAddress")["data-__meta"].originalProps.lat
      var lng = this.refs.settingsFormChild.getFieldProps("streetAddress")["data-__meta"].originalProps.lng
      message.loading("Creating property...", 0)
      if(lat == -100){
        console.log("Not found")
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({ 'address': this.state.streetAddress}, (results, status) => {
            if (status == google.maps.GeocoderStatus.OK) {
              const lat = results[0].geometry.location.lat()
              const lng = results[0].geometry.location.lng()
              this.secondStep(lat, lng)
            }
        })
      }
      else{
        this.secondStep(lat, lng)
      }
    }

    onDone = () => {
      this.refs.settingsFormChild.validateFields((error, values) => {
        if(!error){
          this.setState(values, () => {
            this.firstStep()
          })
          
        }
      })
    }
  render() {
    const { userSession, username } = this.context.state.currentUser
    const { current } = this.state;
    const { Step } = Steps

    const steps = [
      {
        title: "Basic",
        content: "Basic"
      },
      {
        title: "Description",
        content: "Description"
      },
      {
        title: "Settings",
        content: "Settings"
      }
    ]

    return (
      <div>
        <Steps current={current} style={{paddingBottom: "31px"}}>
          {steps.map(item => (
          <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div>
          {
            this.displayForm(this.state.current)
          }
        </div>
        <div className="steps-action">
        {current > 0 && (
            <Button style={{ marginRight: 8 }} onClick={()=> this.prev()}>
              Previous
            </Button>
            )}

          {current < steps.length - 1 && ( <Button type="primary" onClick={()=> this.next()}>
            Next
            </Button>
            )}
            {current === steps.length - 1 && (
            <Button type="primary" onClick={this.onDone}>
              Done
            </Button>
            )}
           
        </div>
      </div>
    )
  }
}

AdminPropertyCreate.contextType = MyContext
export default withRouter(AdminPropertyCreate)
