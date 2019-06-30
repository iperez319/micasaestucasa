/* global google */
import React, { Component } from 'react'
import { MyContext } from 'components/User/UserProvider'
import { Steps, Button, message } from 'antd';
import BasicForm from 'components/ProposalForms/BasicForm';
import OfferForm from 'components/ProposalForms/OfferForm'
import Proposal from "models/Proposal";
import Property from 'models/Property'
import { withRouter } from 'react-router-dom'
import _ from 'lodash'
class AdminProposalCreate extends Component {
  state = {
    current: 0,
    lat: -1000,
    lng: -1000,
    mainText: "",
    city: ""
  }
  async next() {
    const current = this.state.current + 1;
    switch(this.state.current){
      case 0:
        this.refs.proposalsBasicsFormChild.validateFields((error, values) => {
          if(!error){
            this.setState({ current })
            this.setState(values)
            var lat = this.refs.proposalsBasicsFormChild.getFieldProps("nearTo")["data-__meta"].originalProps.lat
            var lng = this.refs.proposalsBasicsFormChild.getFieldProps("nearTo")["data-__meta"].originalProps.lng
            var city = this.refs.proposalsBasicsFormChild.getFieldProps("nearTo")["data-__meta"].originalProps.city
            var mainText = this.refs.proposalsBasicsFormChild.getFieldProps("nearTo")["data-__meta"].originalProps.mainText
            if(lat == -100){
              console.log("Not found")
              var geocoder = new google.maps.Geocoder();
              geocoder.geocode({ 'address': this.state.streetAddress}, (results, status) => {
                  if (status == google.maps.GeocoderStatus.OK) {
                    const lat = results[0].geometry.location.lat()
                    const lng = results[0].geometry.location.lng()
                    const city = _.find(results[0].address_components, (value) => {
                      return value.types.includes('locality')
                    }).long_name
                    this.setState({lat, lng, city, mainText})
                  }
              })
            }
            else{
              this.setState({lat, lng, city, mainText})
            }
          }
        })
        break;
        case 1:
          this.refs.offerFormChild.validateFields((error, values) => {
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
        this.refs.proposalsBasicsFormChild.validateFields((error, values) => {
          if(!error){
            this.setState({ current });
            this.setState(values)
          }
        })
        break;
        case 1:
          this.refs.offerFormChild.validateFields((error, values) => {
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
        return <BasicForm ref="proposalsBasicsFormChild" state={this.state}/>
        break;
      case 1:
        return <OfferForm ref="offerFormChild" state={this.state}/>
        break;
    }
  }
  submit = async () => {
    const { userData, username } = this.context.state.currentUser
    const { history } = this.props
    var newProposal = new Proposal({
      propertyType: this.state.homeType,
      user: username,
      location: {
        type: "Point",
        coordinates: [this.state.lat, this.state.lng]
      },
      locationText: this.state.mainText,
      city: this.state.city,
      numberOfGuests: this.state.numberOfGuests,
      price: this.state.price,
      startDate: this.state.date[0].format("MM/DD/YYYY"),
      endDate: this.state.date[1].format("MM/DD/YYYY"),
      lat: this.state.lat,
      lng: this.state.lng
    })
    console.log(newProposal)
    await newProposal.save()

    message.destroy()
    message.success("Created proposal")
    history.goBack()
  }


  onDone = () => {
    this.refs.offerFormChild.validateFields((error, values) => {
      if(!error){
        message.loading("Creating proposal...", 0)
        this.setState(values, () => {
          this.submit()
        })
      }
    })
  }
  render() {
    const { Step } = Steps;
    const { userSession, username } = this.context.state.currentUser
    const { current } = this.state;

    const steps = [
      {
        title: 'Basics',
      },
      {
        title: 'Offer',
      },
    ];
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
            <Button style={{ marginRight: 8 }} onClick={() => this.prev()}>
              Previous
            </Button>
          )}
          {current < steps.length - 1 && (
            <Button type="primary" onClick={() => this.next()}>
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

AdminProposalCreate.contextType = MyContext
export default withRouter(AdminProposalCreate)
  