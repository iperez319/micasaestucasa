import React from 'react';
import PropTypes from 'prop-types';
import QueueAnim from 'rc-queue-anim';
import { Button } from 'antd';
import BannerImage from './BannerImage';
import { getConfig, User } from 'radiks'

class Banner extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
  }
  static defaultProps = {
    className: 'home-banner',
  }
  handleSignIn = () => {
    const { userSession } = getConfig()
    userSession.redirectToSignIn()
  }
  render() {
    const { className } = this.props;
    return (
      <div className={`home-layout-wrapper ${className}`}>
        <div className="home-layout">
          <QueueAnim className={`${className}-content-wrapper`} delay={300} ease="easeOutQuart">
            <h1 key="h2">
              Decentralized Homesharing
            </h1>
            <p key="p">The Future is Here!</p>
            <span key="button">
              <Button
                type="primary"
                onClick={this.handleSignIn}
                // onClick={async () => await User.createWithCurrentUser()}
              >
                Get Started
              </Button>
            </span>
          </QueueAnim>
          <div className={`${className}-image-wrapper`}>
            <BannerImage />
          </div>
        </div>
      </div>
    );
  }
}

export default Banner;
