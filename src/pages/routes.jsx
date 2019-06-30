import React, { Component } from 'react'
import { Switch, Redirect, Route } from 'react-router-dom'
import UserProvider from 'components/User/UserProvider'
import { getConfig } from 'radiks'
import _ from 'lodash'
import AdminUsernameRoute from 'pages/host/_username/routes'
import AdminGuestUsernameRoute from 'pages/guest/_username/routes'

class Routes extends Component{
    state = {
        user: {}
    }
    componentDidMount(){
        const { userSession } = getConfig()
        const user = userSession.loadUserData()
        this.setState({user})
    }
    render(){
        const { user } = this.state
        const { userSession } = getConfig()

        if(_.isEmpty(user)){
            return null
        }
        return (
            <UserProvider userSession={userSession}>
              <Switch>
                <Route exact path="/" render={()=>
                  <Redirect to={`/guest/${user.username}`}/>} />
                  <Route path="/guest/:username" render={({ match })=>
                    <AdminGuestUsernameRoute match={match} />}
                    />
                    <Route path="/host/:username" render={({ match })=>
                      <AdminUsernameRoute match={match} />}
                      />
              </Switch>
            </UserProvider>
        )
    }
}

export default Routes