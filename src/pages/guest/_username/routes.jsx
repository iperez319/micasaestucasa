import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, Redirect } from 'react-router-dom'
import AdminUsernameProposalsRoutes from 'pages/guest/_username/proposals/routes'
import AdminUsername from 'pages/guest/_username/proposals'
import InboxRoute from 'pages/guest/_username/inbox/routes'

class AdminGuestUsernameRoute extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired
  }

  render() {
    const { username } = this.props.match.params

    return (
      <Switch>
        <Route
          exact
          path={this.props.match.url}
          render={() => <Redirect to={`/guest/${username}/proposals`}/>}
        />
        <Route
          path={`${this.props.match.url}/proposals`}
          render={({ match }) => <AdminUsernameProposalsRoutes match={match} />}
        />
        <Route
          path={`${this.props.match.url}/inbox`}
          render={({ match }) => <InboxRoute match={match} />}
        />
      </Switch>
    )
  }
}

export default AdminGuestUsernameRoute
