import React, { Component } from 'react'
import { List, Card, Icon, Typography, Descriptions, Carousel, Tooltip, Popconfirm, message } from 'antd'
import { withRouter } from 'react-router-dom'
import { MyContext } from 'components/User/UserProvider'
import _ from 'lodash'
import Property from 'models/Property'

class GuestPropertyGrid extends Component{
    displayDescription = (property) => {
        return(
            <Descriptions border column={{ xxl: 4, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 }}>
                <Descriptions.Item label="Type">Apartment</Descriptions.Item>
                <Descriptions.Item label="Price">$50 - $80 per night</Descriptions.Item>
            </Descriptions>
        )
    }
    goToProperty = (propertyId) => {
        const { history, proposalId } = this.props
        const { username } = this.context.state.currentUser
        history.push(`/guest/${username}/proposals/property/${propertyId}`)
    }
    acceptProperty = async (propertyId) => {
        const { proposal, history } = this.props
        console.log(this.props.properties)
        message.loading("Accepting property...", 0)
        var property = await Property.findById(propertyId)
        console.log(property)
        var pendingProposal = _.find(property.attrs.pendingProposals, (value) => {
            return proposal._id == value.id
        })
        pendingProposal.status = 'payment'
        var restOfProposals = _.filter(property.attrs.pendingProposals, (value) => {
            return proposal._id != value.id
        })
        var onlyMatchedProperty = _.filter(proposal.attrs.matchedProperties, (value) => {
            return value._id == propertyId
        })
        property.update({pendingProposals: [pendingProposal, ...restOfProposals]})
        await property.save()
        proposal.update({status: 'payment', matchedProperties: onlyMatchedProperty})
        await proposal.save()
        message.destroy()
        message.success('Done')
        history.goBack()

    }
    rejectProperty = (propertyId) => {

    }
    render(){
        const { Title } = Typography;
        const { Meta } = Card;
        // {gutter: 16,xs: 1,sm: 2,md: 4,lg: 4,xl: 6,xxl: 3}
        return(<List grid={{gutter: 16,xs: 1,sm: 2,md: 3,lg: 4,xl: 4,xxl: 3}} dataSource={this.props.properties} renderItem={item=> (
                <List.Item>
                    <Card hoverable cover={<img src={item.imageFiles[0]} onClick={() => this.goToProperty(item._id)}></img>} actions={[<Popconfirm title="Are you sure you want to choose this property?" okText="Yes" cancelText="No" onConfirm={() => this.acceptProperty(item._id)}><Tooltip title="Choose property"onClick={() => console.log("check")}><Icon type="check" /></Tooltip></Popconfirm>, <Popconfirm title="Are you sure you want to remove this property?" okText="Yes" cancelText="No" onConfirm={() => this.rejectProperty(item._id)}><Tooltip title="Remove property"><Icon type="close" /></Tooltip></Popconfirm>, <Tooltip title="Counter property offer"><Icon type="warning" /></Tooltip>]}>
                        <Meta onClick={() => this.goToProperty(item._id)} title={<div style={{whiteSpace: "normal", paddingBottom: "5px"}}>{item.title}</div>} description={this.displayDescription(null)}/>
                    </Card>
                </List.Item>
          )}
          />)
    }
}

GuestPropertyGrid.contextType = MyContext
export default withRouter(GuestPropertyGrid)