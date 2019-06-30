import React, { Component } from 'react'
import { List, Icon, Typography, Card } from 'antd'
import { withRouter } from 'react-router-dom'
import { MyContext } from 'components/User/UserProvider'

class ProposalsGrid extends Component{

    goToAddProposal = () => {
        const { history } = this.props
        const { userSession, username } = this.context.state.currentUser
        history.push(`/guest/${username}/proposals/create`)
    }
    goToProposal = (proposalId) => {
        const { history } = this.props
        const { userSession, username } = this.context.state.currentUser
        history.push(`/guest/${username}/proposals/${proposalId}`)
    }
    
    render(){
        const { Title } = Typography
        const { proposals } = this.props
        const listData = [];
        for (var i in proposals) {
          var proposal = proposals[i]
          listData.push({
            href: 'http://ant.design',
            title: proposal.attrs.propertyType == 'Any' ? `A Property in or near ${proposal.attrs.locationText}` : `${proposal.attrs.propertyType} in or near ${proposal.attrs.locationText}`,
            // avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            description:
              `Starting in ${proposal.attrs.startDate} ending in ${proposal.attrs.endDate}`,
            content:
              `Looking for ${proposal.attrs.propertyType == 'Any' ? 'any type of Property' : "a " + proposal.attrs.propertyType}. There ${proposal.attrs.numberOfGuests > 1 ? "are" : "is"} going to be ${proposal.attrs.numberOfGuests} guest${proposal.attrs.numberOfGuests > 1 ? "s" : ""}`,
              _id: proposal._id
          });
        }
        console.log(listData)
        return (
            <div>
              <List itemLayout="vertical" size="large"
                pagination={{onChange: page => {console.log(page);},pageSize: 3,}} dataSource={listData}
                renderItem={item=> (
                <List.Item key={item.title} onClick={()=> this.goToProposal(item._id)}>
                  <List.Item.Meta title={<a>
                    <Title level={4}>{item.title}</Title></a>}
                    description={item.description}
                    />
                    {item.content}
                </List.Item>

                )}

                >
                    <Card bordered={false} onClick={this.goToAddProposal}>
                        <Icon type="plus" style={{fontSize: "30px", display: "block", margin: "auto"}}/>
                        <a><Title level={4} style={{textAlign: "center"}}>Add Proposal</Title></a>
                    </Card>
                </List>
                
            </div>

        )
    }
}

ProposalsGrid.contextType = MyContext
export default withRouter(ProposalsGrid)