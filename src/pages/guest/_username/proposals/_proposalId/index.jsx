import React, { Component } from 'react'
import Proposal from 'models/Proposal'
import ProposalView from 'components/ProposalView'

class ViewProposal extends Component{
    state = {
        proposal: {}
    }
    async componentDidMount(){
        console.log("ProposalView", this.props.match)
        // const proposalId = this.props.match.proposalId
        const { proposalId } = this.props.match.params
        
        const proposal = await Proposal.findById(proposalId)

        this.setState({
            proposal
        })
    }
    render(){
        return this.state.proposal.attrs != undefined 
        ? <ProposalView proposal={this.state.proposal}/>
        : null
    }
}

export default ViewProposal