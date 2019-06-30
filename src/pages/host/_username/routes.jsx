import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, Redirect } from 'react-router-dom'
import AdminUsernamePropertiesRoutes from 'pages/host/_username/properties/routes'
import AdminUsername from 'pages/host/_username/properties'
import BillingPage from 'pages/host/_username/billing'
import InboxRoute from 'pages/host/_username/inbox/routes'

class AdminUsernameRoute extends Component {
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
            render={() => <Redirect to={`/host/${username}/properties`}/>}
          />
          <Route
            path={`${this.props.match.url}/properties`}
            render={({ match }) => <AdminUsernamePropertiesRoutes match={match} />}
          />
          <Route
            path={`${this.props.match.url}/billing`}
            render={({match}) => <BillingPage match={match}/>}/>
          <Route
            path={`${this.props.match.url}/inbox`}
            render={({match}) => <InboxRoute match={match}/>}/>
        </Switch>
      )
    }
  }
  
  export default AdminUsernameRoute
  