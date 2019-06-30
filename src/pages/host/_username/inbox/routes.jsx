import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, Redirect } from 'react-router-dom'
import InboxPage from 'pages/host/_username/inbox'
import InboxDetail from 'pages/host/_username/inbox/_proposalId'


class InboxRoute extends Component {
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
          render={() => <InboxPage/>}
        />
        <Route
          path={`${this.props.match.url}/:proposalId`}
          render={({ match }) => <InboxDetail match={match} />}
        />
      </Switch>
    )
  }
}

export default InboxRoute