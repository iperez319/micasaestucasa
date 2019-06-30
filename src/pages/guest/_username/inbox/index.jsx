import React, { Component } from 'react'
import Proposal from 'models/Proposal'
import _ from 'lodash'
import { List, Typography } from 'antd'
import { withRouter } from 'react-router-dom'

class InboxPage extends Component{
    state = {
        threads: []
    }
    async componentDidMount(){
        const closedProposals = await Proposal.fetchOwnList({open: false})
        const upToDateProposals = _.filter(closedProposals, (value) => {
            return (new Date(value.attrs.endDate)) > new Date()
        })
        const threads = _.map(upToDateProposals, (value) => {
            return {title: value.attrs.matchedProperties[0].title, description: `${value.attrs.startDate}-${value.attrs.endDate}`, _id: value._id}
        })
        this.setState({threads})
    }
    handleClick = (id) => {
        const { history } = this.props
        history.push(window.location.pathname + `/${id}`)
    }
    render(){
        const { Title, Text } = Typography
        return (
            <div>
            <Title level={2}>Inbox</Title>
            <List
            itemLayout="vertical"
            dataSource={this.state.threads}
            renderItem={item => (
            <List.Item onClick={() => this.handleClick(item._id)}>
                <List.Item.Meta
                // avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                title={<a><Text style={{fontSize: "23px", fontWeight: "600"}}>{item.title}</Text></a>}
                description={<Text style={{fontSize: "17px"}}>{item.description}</Text>}
                />
            </List.Item>
    )}
        />
        </div>
        )
    }
}

export default withRouter(InboxPage)