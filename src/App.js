import React,{ Component } from 'react';
import { PageHeader } from 'antd'
import Navbar from 'components/Navbar'
import { appConfig } from 'utils/constants'
import { UserSession } from 'blockstack'
import { configure, User, getConfig  } from 'radiks';
import { Layout } from 'antd';
import Routes from 'pages/routes'
import Home from 'components/Home'

class App extends Component{
  state = {
    userSession: new UserSession({ appConfig }),
    username: ""
  }
  componentWillMount(){
    configure({
      // apiServer: 'http://localhost:1260',
      apiServer: 'https://arcane-shore-57140.herokuapp.com',
      userSession: this.state.userSession
    });
  }
  componentDidMount = async () => {
    const { userSession } = getConfig()
    

    if (!userSession.isUserSignedIn() && userSession.isSignInPending()) {
      const userData = await userSession.handlePendingSignIn()
      await User.createWithCurrentUser()
      console.log("User Created with Radiks")
      if (!userData.username) {
        throw new Error('This app requires a username')
      }
      this.setState({username: userData.username})
      console.warn(this.state)
      window.location = '/'
    }
  }

  
  render(){
    const { userSession } = getConfig()
    const { Content, Header } = Layout;
    console.log(this.state)
    return (
      <div className="App">
        
          <Navbar userSession={this.state.userSession} username={this.state.username}/>
              <div>
                {
                  userSession.isUserSignedIn()
                    ? <div style={{padding: "25px"}}><Routes/></div>
                    : <div style={{paddingTop: "10px"}}><Home/></div>
                }
              </div>
      
      </div>
    );
  }
}

export default App;
