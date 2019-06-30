import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'
import AdminProposalCreate from 'pages/guest/_username/proposals/create'
import GuestViewProposals from 'pages/guest/_username/proposals'
import ViewProposal from 'pages/guest/_username/proposals/_proposalId'
import GuestPropertyViewPage from 'pages/guest/_username/proposals/_propertyId'
// import AdminUsernameProposalsViewRoutes from 'pages/guest/_username/proposals/_proposalId/routes'

class AdminUsernameProposalsRoutes extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
  }
  // componentDidMount(){
  //   console.log(this.props)
  // }

  render() {
    return (
      <Switch>
        <Route
          exact
          path={this.props.match.url}
          render={() => <GuestViewProposals />}
        />
        <Route
          path={`${this.props.match.url}/create`}
          render={() => <AdminProposalCreate />}
        />
        <Route
          path={`${this.props.match.url}/property/:propertyId`}
          // render={({ match }) => <AdminUsernameProposalsViewRoutes match={match}/>}
          render={({ match }) => <GuestPropertyViewPage match={match}/>}
        />
        <Route
          path={`${this.props.match.url}/:proposalId`}
          // render={({ match }) => <AdminUsernameProposalsViewRoutes match={match}/>}
          render={({ match }) => <ViewProposal match={match}/>}
        />
        
      </Switch>
    )
  }
}

export default AdminUsernameProposalsRoutes
