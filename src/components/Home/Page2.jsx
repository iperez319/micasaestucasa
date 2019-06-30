import React from 'react';
import QueueAnim from 'rc-queue-anim';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import QRCode from 'qrcode.react';
import { Row, Col } from 'antd';
import { page2 } from './data';

export default function Page2() {
  
  return (
    <div className="home-layout-wrapper home-case-wrapper">
    <OverPack component="section" className="home-layout">
      <QueueAnim
        type="bottom"
        className="page text-center"
        leaveReverse
        key="page"
      >
        <h2 key="title">How it works?</h2>
        <i key="i" className="line" />
        <QueueAnim type="bottom" className="info-content" key="content">
          <p className="main-info" key="1">Hosts list their properties inputting data such as price ranges, street address, amenities, etc..</p>
          <p className="main-info" key="2">Guest creates a proposal inputting things such as a desired location and the price they want to pay</p>
          <p className="main-info" key="3">If price inputted by guests is in the price range of any host near the location inputted they get notified</p>
          <p className="main-info" key="4">The host then decides whether to counter the offer, accept it or reject it</p>
          <p className="main-info" key="5">After the host accepts the offer, their property gets added to a list the guest can see of "Matched Properties"</p>
          <p className="main-info" key="6">There the guests can see all the matches and select which one to accept and pay</p>
        </QueueAnim>
      </QueueAnim>
    </OverPack>
    </div>
    );
}
