import React, { Component } from 'react';
import { Drawer, Button, Icon, Divider, Menu } from 'antd';
import { getConfig  } from 'radiks';
import './Navbar.css';
import { withRouter } from 'react-router-dom'

class Navbar extends Component {
  state = {
    visible: false,
    mode: 'guest',
    user: {}
  };

  componentWillMount(){
      this.unlisten = this.props.history.listen((location, action) => {
          if(location.pathname.includes('guest')){
            this.setState({mode: 'guest'})
          }
          else if(location.pathname.includes('host')){
            this.setState({mode: 'host'})
          }
      })
  }
  componentWillUnmount(){
      this.unlisten();
  }

  componentDidMount(){
    const { userSession } = getConfig()
    if(userSession.isUserSignedIn()){
      this.setState({user: userSession.loadUserData()})
    }
    if(window.location.pathname.includes('host')){
      this.setState({mode: 'host'})
    }
    else if(window.location.pathname.includes('guest')){
      this.setState({mode: 'guest'})
    }
    
  }

  showDrawer = () => {
    this.setState({
      visible: true
    });
  };

  onClose = () => {
    this.setState({
      visible: false
    });
  };
  handleSignIn = () => {
    const { userSession } = getConfig()
    userSession.redirectToSignIn()
  }
  handleSignOut = () => {
      const { userSession } = getConfig()
      userSession.signUserOut()
      window.location = '/'
  }
  handleClick = (e) => {

    const { history } = this.props
    const { userSession } = getConfig()
    const { user } = this.state

    if(!userSession.isUserSignedIn()){
      if (e.key == "signIn") {
        this.handleSignIn()
      }
      else if(e.key == "signOut"){
          this.handleSignOut()
      }
      else if(e.key == "guest"){
        history.push(`/guest`)
      }
      else if(e.key== "host"){
        history.push(`/host`)
      }
    }
    else{
      if (e.key == "signIn") {
        this.handleSignIn()
      }
      else if(e.key == "signOut"){
          this.handleSignOut()
      }
      else if(e.key == "guest"){
        history.push(`/guest/${user.username}/proposals`)
      }
      else if(e.key== "host"){
        history.push(`/host/${user.username}/properties`)
      }
    }

    
  }
  
  

  render() {
    const { userSession } = getConfig()
    const { user } = this.state
    console.log(user)
    console.log(userSession)
    console.log(userSession.isUserSignedIn())
    return (
      <nav className="menu">
        <div className="menu__logo">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/beaverbot-7a289.appspot.com/o/logo.png?alt=media&token=3f72769f-39c7-4749-bc20-12515afdaf0b"
            style={{width: "auto", height:"50px", display: "block", margin: "auto"}}></img>
        </div>
        <div className="menu__container">
        {
          userSession.isUserSignedIn() && user.username != undefined
            ? this.state.mode == 'guest'
              ? <div className="menu_left">
              <Menu mode="horizontal">
                <Menu.Item key="proposals">
                  <a href={`/guest/${user.username}/proposals`}>Proposals</a>
                </Menu.Item>
                <Menu.Item key="inbox_guest">
                  <a href={`/guest/${user.username}/inbox`}>Inbox</a>
                </Menu.Item>
                <Menu.Item key="billing_guest">
                  <a href={`/guest/${user.username}/billing`}>Billing</a>
                </Menu.Item>
              </Menu>
            </div>
            : <div className="menu_left">
            <Menu mode="horizontal">
              <Menu.Item key="properties">
                <a href={`/host/${user.username}/properties`}>Properties</a>
              </Menu.Item>
              <Menu.Item key="inbox_host">
                <a href={`/host/${user.username}/inbox`}>Inbox</a>
              </Menu.Item>
              <Menu.Item key="billing_host">
                <a href={`/host/${user.username}/billing`}>Billing</a>
              </Menu.Item>
            </Menu>
            </div>
          : null
        }
        
          
          <div className="menu_rigth">
            <Menu mode="horizontal" onClick={this.handleClick}>
              <Menu.Item key="host">
                <a href="#">Host</a>
              </Menu.Item>
              <Menu.Item key="guest">
                <a href="#">Guest</a>
              </Menu.Item>
              {
                  userSession.isUserSignedIn()
                    ? <Menu.Item key="signOut">
                        <a>Sign Out</a>
                    </Menu.Item>
                    : <Menu.Item key="signIn">
                        <a>Sign In</a>
                    </Menu.Item>
              }
              
            </Menu>
          </div>
          <Button className="menu__mobile-button" type="link" onClick={this.showDrawer}>
            <Icon type="menu" style={{color: "black"}} />
          </Button>
          <Drawer title="Basic Drawer" placement="right" className="menu_drawer" closable={false} onClose={this.onClose}
            visible={this.state.visible}>
            <Menu mode="inline">
              <Menu.Item key="mail">
                <a href="#">Home</a>
              </Menu.Item>
              <Menu.Item key="nothing">
                <a href="#">Blog</a>
              </Menu.Item>
              <Menu.Item key="alipay">
                <a href="#">Contact Us</a>
              </Menu.Item>
            </Menu>
            <div style={{paddingLeft: "24px", paddingRight: "24px"}}>
              <Divider />
            </div>
            <Menu mode="inline" onClick={this.handleClick}>
              <Menu.Item key="mail">
                <a href="#">Host</a>
              </Menu.Item>
              <Menu.Item key="app">
                <a href="#">Guest</a>
              </Menu.Item>
              <Menu.Item key="signIn">
                Sign In
              </Menu.Item>
            </Menu>
          </Drawer>
        </div>
      </nav>
    );
  }
}

export default withRouter(Navbar);