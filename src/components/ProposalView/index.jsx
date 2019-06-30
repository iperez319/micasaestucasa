import React, { Component } from 'react'
import { Typography, Divider, Descriptions, Badge, Carousel, Collapse } from 'antd'
import MapContainer from 'components/MapContainer'
import GuestPropertyGrid from 'components/GuestPropertyGrid'
import { withRouter } from 'react-router-dom'
import QRCode from 'qrcode.react'

class ProposalView extends Component{

    render(){
        const { Title, Paragraph, Text } = Typography
        const { Panel } = Collapse;
        const { proposal } = this.props

        switch(proposal.attrs.status){
            case "initial":
                return (
                    <div><Title >{proposal.attrs.propertyType == 'Any' ? `A Property in or near ${proposal.attrs.locationText}` : `${proposal.attrs.propertyType} in or near ${proposal.attrs.mainText}`}</Title>
                            <Descriptions bordered>
                                <Descriptions.Item label="Start Date">{proposal.attrs.startDate}</Descriptions.Item>
                                <Descriptions.Item label="End Date">{proposal.attrs.endDate}</Descriptions.Item>
                                <Descriptions.Item label="Proposed Price per Night">${proposal.attrs.price}</Descriptions.Item>
                                <Descriptions.Item label="Order time">2018-04-24 18:00:00</Descriptions.Item>
                                <Descriptions.Item label="Status" span={3}>
                                    {
                                        proposal.attrs.open 
                                            ? <Badge status="success" text="Open" />
                                            : <Badge status="error" text="Closed" />
                                    }
                                    
                                </Descriptions.Item>
                            </Descriptions>
                            <Divider/>
                            <div>
                                <MapContainer isMarkerShown googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places" loadingElement={<div style={{ height: `100%` }} />} containerElement={<div style={{ height: `400px` }} />} mapElement={<div style={{ height: `100%` }} />} lat={proposal.attrs.lat} lng={proposal.attrs.lng}/> 
                            </div>
                            <Divider/>
                            <Title level={3} style={{marginBottom: "25px"}}>Matched Properties</Title>
                            <GuestPropertyGrid properties={proposal.attrs.matchedProperties} proposalId={proposal._id} proposal={proposal}/></div>
                )
                break;
            case "payment":
                return (
                    <div>
                    <div style={{width: "500px", height: "298px"}}>
                        <Carousel style={{width: "500px", height:"298px", display:"block", margin: "auto"}} >
                            {
                                proposal.attrs.matchedProperties[0].imageFiles.map((value, key) => {
                                    return (
                                        <div key={key} style={{width: "500px", height:"298px"}}>
                                            <img src={value} style={{width: "500px", height:"298px"}}></img>
                                        </div>
                                    )
                                })
                            }   
                        </Carousel>
                    </div>
                    <Divider/>
                    <Title style={{marginBottom: "-15px"}}>{proposal.attrs.matchedProperties[0].title}</Title>
                    <Title level={4} style={{marginBottom: "15px"}}>{proposal.attrs.matchedProperties[0].streetAddress}</Title>
                    <Paragraph style={{fontSize: "medium", lineHeight: "30px"}}>{proposal.attrs.matchedProperties[0].description}</Paragraph>
                    <Divider/>
                        <Title level={3}>Invoice</Title>
                        <div style={{width: "75%", display: "block", margin: "auto"}}>
                        <Collapse bordered={false}>
                            <Panel header={<div><Title level={4} style={{display: "inline"}}>Stay</Title><Title level={4} style={{display: "inline", float: "right", margin: 0}}>{`$${(((new Date(proposal.attrs.endDate) - new Date(proposal.attrs.startDate))/(1000*60*60*24))) * proposal.attrs.price}`}</Title></div>}>
                                <Text style={{fontSize: "17px", display: "inline"}}>{`$${proposal.attrs.price} x ${(((new Date(proposal.attrs.endDate) - new Date(proposal.attrs.startDate))/(1000*60*60*24)))} nights`}</Text>
                                <Text style={{fontSize: "17px", float: "right", display: "inline"}}>{`$${(((new Date(proposal.attrs.endDate) - new Date(proposal.attrs.startDate))/(1000*60*60*24))) * proposal.attrs.price}`}</Text>
                            </Panel>
                            <Panel header={<div><Title level={4} style={{display: "inline"}}>Fees</Title><Title level={4} style={{display: "inline", float: "right", margin: 0}}>${((((new Date(proposal.attrs.endDate) - new Date(proposal.attrs.startDate))/(1000*60*60*24))) * proposal.attrs.price * 0.01) + 0.5}</Title></div>}>
                                <Text style={{fontSize: "17px", display: "inline"}}>1% Fee</Text>
                                <Text style={{fontSize: "17px", float: "right", display: "inline"}}>{`$${(((new Date(proposal.attrs.endDate) - new Date(proposal.attrs.startDate))/(1000*60*60*24))) * proposal.attrs.price * 0.01}`}</Text>
                                <br></br>
                                <Text style={{fontSize: "17px", display: "inline"}}>Estimated ⚡ Network Transaction Fee</Text>
                                <Text style={{fontSize: "17px", float: "right", display: "inline"}}>Approx. $0.50</Text>
                            </Panel>
                            <Panel header={<div><Title level={4} style={{display: "inline"}}>Total</Title><Title level={4} style={{display: "inline", float: "right", margin: 0}}>${((((new Date(proposal.attrs.endDate) - new Date(proposal.attrs.startDate))/(1000*60*60*24))) * proposal.attrs.price * 1.01) + 0.5}</Title></div>} showArrow={false} disabled/>
                        </Collapse>
                        </div>
                    <Divider/>
                    {
                        proposal.attrs.status == "paid"
                            ? null
                            : <div><Title level={3}>Payment</Title>
                        <QRCode value={proposal.attrs.paymentInfo} size={256} style={{display: "block", margin:"auto"}}/>
                        <div style={{width: "75%", display: "block", margin: "auto", paddingTop: "10px"}}>
                            <Paragraph ellipsis={{ rows: 3, expandable: true }}style={{wordBreak: "break-all", textAlign: "center"}}>{proposal.attrs.paymentInfo}</Paragraph>
                        </div><Divider/></div>
                    }
                    {
                        proposal.attrs.status == "paid"
                            ? <div><Title level={3} style={{marginBottom: '25px'}}>Exact Location</Title>
                                <MapContainer googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places" loadingElement={<div style={{ height: `100%` }} />} containerElement={<div style={{ height: `400px` }} />} mapElement={<div style={{ height: `100%` }} />} lat={proposal.attrs.matchedProperties[0].lat} lng={proposal.attrs.matchedProperties[0].lng}/></div>
                            : <div><Title level={3} style={{marginBottom: '25px'}}>Approximate Location</Title>
                            <MapContainer guest googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places" loadingElement={<div style={{ height: `100%` }} />} containerElement={<div style={{ height: `400px` }} />} mapElement={<div style={{ height: `100%` }} />} lat={proposal.attrs.matchedProperties[0].lat} lng={proposal.attrs.matchedProperties[0].lng}/></div>
                    }
                    
                    <Divider/>   
            </div>
                )
                break;
            case "paid":
                        return (<div>
                        <div style={{width: "500px", height: "298px"}}>
                            <Carousel style={{width: "500px", height:"298px", display:"block", margin: "auto"}} >
                                {
                                    proposal.attrs.matchedProperties[0].imageFiles.map((value, key) => {
                                        return (
                                            <div key={key} style={{width: "500px", height:"298px"}}>
                                                <img src={value} style={{width: "500px", height:"298px"}}></img>
                                            </div>
                                        )
                                    })
                                }   
                            </Carousel>
                        </div>
                        <Divider/>
                        <Title style={{marginBottom: "-15px"}}>{proposal.attrs.matchedProperties[0].title}</Title>
                        <Title level={4} style={{marginBottom: "15px"}}>{proposal.attrs.matchedProperties[0].streetAddress}</Title>
                        <Paragraph style={{fontSize: "medium", lineHeight: "30px"}}>{proposal.attrs.matchedProperties[0].description}</Paragraph>
                        <Divider/>
                            <Title level={3}>Invoice</Title>
                            <div style={{width: "75%", display: "block", margin: "auto"}}>
                            <Collapse bordered={false}>
                                <Panel header={<div><Title level={4} style={{display: "inline"}}>Stay</Title><Title level={4} style={{display: "inline", float: "right", margin: 0}}>{`$${(((new Date(proposal.attrs.endDate) - new Date(proposal.attrs.startDate))/(1000*60*60*24))) * proposal.attrs.price}`}</Title></div>}>
                                    <Text style={{fontSize: "17px", display: "inline"}}>{`$${proposal.attrs.price} x ${(((new Date(proposal.attrs.endDate) - new Date(proposal.attrs.startDate))/(1000*60*60*24)))} nights`}</Text>
                                    <Text style={{fontSize: "17px", float: "right", display: "inline"}}>{`$${(((new Date(proposal.attrs.endDate) - new Date(proposal.attrs.startDate))/(1000*60*60*24))) * proposal.attrs.price}`}</Text>
                                </Panel>
                                <Panel header={<div><Title level={4} style={{display: "inline"}}>Fees</Title><Title level={4} style={{display: "inline", float: "right", margin: 0}}>${((((new Date(proposal.attrs.endDate) - new Date(proposal.attrs.startDate))/(1000*60*60*24))) * proposal.attrs.price * 0.01) + 0.5}</Title></div>}>
                                    <Text style={{fontSize: "17px", display: "inline"}}>1% Fee</Text>
                                    <Text style={{fontSize: "17px", float: "right", display: "inline"}}>{`$${(((new Date(proposal.attrs.endDate) - new Date(proposal.attrs.startDate))/(1000*60*60*24))) * proposal.attrs.price * 0.01}`}</Text>
                                    <br></br>
                                    <Text style={{fontSize: "17px", display: "inline"}}>Estimated ⚡ Network Transaction Fee</Text>
                                    <Text style={{fontSize: "17px", float: "right", display: "inline"}}>Approx. $0.50</Text>
                                </Panel>
                                <Panel header={<div><Title level={4} style={{display: "inline"}}>Total(Paid)</Title><Title level={4} style={{display: "inline", float: "right", margin: 0}}>${((((new Date(proposal.attrs.endDate) - new Date(proposal.attrs.startDate))/(1000*60*60*24))) * proposal.attrs.price * 1.01) + 0.5}</Title></div>} showArrow={false} disabled/>
                            </Collapse>
                            </div>
                        <Divider/>
                        <Title level={3} style={{marginBottom: '25px'}}>Exact Location</Title>
                        <MapContainer googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places" loadingElement={<div style={{ height: `100%` }} />} containerElement={<div style={{ height: `400px` }} />} mapElement={<div style={{ height: `100%` }} />} lat={proposal.attrs.matchedProperties[0].lat} lng={proposal.attrs.matchedProperties[0].lng}/>    
                        <Divider/>   
                </div>)
                break;
                default:
                    return null
                    break;
            
        }
        // return (
            // <div>
            //     {
            //         proposal.attrs.status != 'payment'
            //             ? <div><Title >{proposal.attrs.propertyType == 'Any' ? `A Property in or near ${proposal.attrs.locationText}` : `${proposal.attrs.propertyType} in or near ${proposal.attrs.mainText}`}</Title>
            //                 <Descriptions bordered>
            //                     <Descriptions.Item label="Start Date">{proposal.attrs.startDate}</Descriptions.Item>
            //                     <Descriptions.Item label="End Date">{proposal.attrs.endDate}</Descriptions.Item>
            //                     <Descriptions.Item label="Proposed Price per Night">${proposal.attrs.price}</Descriptions.Item>
            //                     <Descriptions.Item label="Order time">2018-04-24 18:00:00</Descriptions.Item>
            //                     <Descriptions.Item label="Status" span={3}>
            //                         {
            //                             proposal.attrs.open 
            //                                 ? <Badge status="success" text="Open" />
            //                                 : <Badge status="error" text="Closed" />
            //                         }
                                    
            //                     </Descriptions.Item>
            //                 </Descriptions>
            //                 <Divider/>
            //                 <div>
            //                     <MapContainer isMarkerShown googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places" loadingElement={<div style={{ height: `100%` }} />} containerElement={<div style={{ height: `400px` }} />} mapElement={<div style={{ height: `100%` }} />} lat={proposal.attrs.lat} lng={proposal.attrs.lng}/> 
            //                 </div>
            //                 <Divider/>
            //                 <Title level={3} style={{marginBottom: "25px"}}>Matched Properties</Title>
            //                 <GuestPropertyGrid properties={proposal.attrs.matchedProperties} proposalId={proposal._id} proposal={proposal}/></div>
            //             :
            //     }
                
            // </div>
        // )
        return null
    }
}

export default withRouter(ProposalView)