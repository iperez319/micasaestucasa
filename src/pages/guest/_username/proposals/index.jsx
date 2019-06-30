import React, { Component } from 'react'
import Proposal from 'models/Proposal'
import { withRouter } from 'react-router-dom'
import ProposalsGrid from 'components/ProposalsGrid'
import { MyContext } from 'components/User/UserProvider'


class GuestViewProposals extends Component{
    state = {
        proposals: {}
    }
    async componentDidMount (){
        const proposals = await Proposal.fetchOwnList()
        this.setState({proposals})
    }
    render(){
        return (
            <div>
                <ProposalsGrid proposals={this.state.proposals}/>
            </div>
        );
    }
}
GuestViewProposals.contextType = MyContext
export default withRouter(GuestViewProposals)