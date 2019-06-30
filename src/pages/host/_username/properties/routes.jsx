import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'
import AdminPropertyCreate from 'pages/host/_username/properties/create'
import HostViewProperties from 'pages/host/_username/properties'
import PropertyViewPage from 'pages/host/_username/properties/_propertyId'

class AdminUsernamePostsRoutes extends Component {
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
          render={() => <HostViewProperties />}
        />
        <Route
          path={`${this.props.match.url}/create`}
          render={() => <AdminPropertyCreate />}
        />
        <Route
          exact
          path={`${this.props.match.url}/:propertyId`}
          render={({ match }) => <PropertyViewPage match={match}/>}
        />
        <Route
          path={`${this.props.match.url}/:post_id/edit`}
          render={() => <div>Admin edit page</div>}
        />
      </Switch>
    )
  }
}

export default AdminUsernamePostsRoutes