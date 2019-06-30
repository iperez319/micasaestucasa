import React, { Component } from 'react'
import { Carousel, Typography, Divider, Calendar, Table, Button, Popconfirm, message } from 'antd'
import moment from 'moment'
import Proposal from 'models/Proposal'
import _ from 'lodash'


class PropertyView extends Component{
    enumerateDaysBetweenDates = (bookedDates) => {

        var dates = [];
        
        for(var i in bookedDates){
            var date = bookedDates[i]
            var currDate = moment(date.startDate).startOf('day');
            var lastDate = moment(date.endDate).startOf('day');
            if(date.startDate != date.endDate){
                dates.push(currDate.clone())
                dates.push(lastDate.clone())
            }
            else{
                dates.push(currDate.clone())
            }
    
            while(currDate.add(1, 'days').diff(lastDate) < 0) {
                dates.push(currDate.clone());
            }
        }
        return dates;
    };
    acceptProposal = async (id) => {
        const { property } = this.props
        message.loading('Accepting proposal...', 0)
        const propo = await Proposal.findById(id)
        propo.update({matchedProperties: [...propo.attrs.matchedProperties, property.attrs]})
        await propo.save()
        var currProposal = _.find(property.attrs.pendingProposals, (value) => {
            return value.id == id
        })
        currProposal.status = 'pending'
        var filteredProposals = _.filter(property.attrs.pendingProposals, (value) => {
            return value.id != id
        })
        property.update({pendingProposals: [currProposal, ...filteredProposals]})
        await property.save()
        message.destroy()
        message.success("Done")
        window.location.reload()
        
    }
    rejectProposal = async (id) => {
        const { property } = this.props
        var newPn = _.filter(property.attrs.pendingProposals, (value) => {
            return value.id != id
        })
        property.update({pendingProposals: newPn})
        await property.save()
        message.success("Done")
        window.location.reload()
    }
    render(){
        const { property } = this.props
        const { Title, Paragraph, Text } = Typography;
        const bookedDatescolumns = [
            {
                title: 'User',
                dataIndex: 'user',
                key: 'user'
            },
            {
              title: 'Start Date',
              dataIndex: 'startDate',
              key: 'startDate',
            },
            {
              title: 'End Date',
              dataIndex: 'endDate',
              key: 'endDate',
            },
            {
              title: 'Price per night',
              dataIndex: 'pricePerNight',
              key: 'pricePerNight',
            },
            {
                title: 'Total',
                dataIndex: 'total',
                key: 'total'
            },
          ];
          
        const bookedDatesdataSource = property.attrs.bookedDates.map((value, key) => {
            return {
                key,
                startDate: value.startDate,
                endDate: value.endDate,
                pricePerNight: "$" + value.price,
                total: "$" + (((new Date(value.endDate) - new Date(value.startDate))/(1000*60*60*24))) * value.price,
                user: value.user
            }
        })
        const pendingProposalscolumns = [
            {
                title: 'User',
                dataIndex: 'user',
                key: 'user'
            },
            {
              title: 'Start Date',
              dataIndex: 'startDate',
              key: 'startDate',
            },
            {
              title: 'End Date',
              dataIndex: 'endDate',
              key: 'endDate',
            },
            {
                title: 'Guests',
                dataIndex: 'numberOfGuests',
                index: 'numberOfGuests'
            },
            {
              title: 'Price per night',
              dataIndex: 'pricePerNight',
              key: 'pricePerNight',
            },
            {
                title: 'Total',
                dataIndex: 'total',
                key: 'total'
            },
            {
                title: 'Actions',
                key:'actions',
                render: (text, record) => (
                    <span>
                        {
                            record.status == 'initial'
                                ? <div>
                                <Popconfirm
                                    title="Are you sure you want to accept the proposal?"
                                    onConfirm={() => this.acceptProposal(record.id)}
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    <Button type="primary" style={{marginRight: "8px"}}>Accept</Button>
                                </Popconfirm>
                                <Popconfirm
                                    title="Are you sure you want to accept the proposal?"
                                    onConfirm={() => this.acceptProposal(record.id)}
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    <Button style={{marginRight: "8px"}}>Counter</Button>
                                </Popconfirm>
                                <Popconfirm
                                    title="Are you sure you want to reject the proposal?"
                                    onConfirm={() => this.rejectProposal(record.id)}
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    <Button type="danger">Reject</Button>
                                </Popconfirm>
                            </div>
                            : record.status == 'payment' ? <p>Pending payment...</p> : <p>Pending approval by Guest...</p>
                        }
                        
                    </span>
                  )
            }
            
          ];
        const pendingProposalsdataSource = property.attrs.pendingProposals.map((value, key) => {
            return {
                key,
                startDate: value.startDate,
                endDate: value.endDate,
                pricePerNight: "$" + value.price,
                total: "$" + (((new Date(value.endDate) - new Date(value.startDate))/(1000*60*60*24))) * value.price,
                user: value.user,
                numberOfGuests: value.numberOfGuests,
                id: value.id,
                status: value.status
            }
        })
        const dates = this.enumerateDaysBetweenDates(property.attrs.bookedDates);
        return (
            <div>
                <div style={{width: "500px", height: "298px"}}>
                    <Carousel style={{width: "500px", height:"298px", display:"block", margin: "auto"}} >
                        {
                            property.attrs.imageFiles.map((value, key) => {
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
                <Title style={{marginBottom: "-15px"}}>{property.attrs.title}</Title>
                <Title level={4} style={{marginBottom: "15px"}}>{property.attrs.streetAddress}</Title>
                <Paragraph style={{fontSize: "medium", lineHeight: "30px"}}>{property.attrs.description}</Paragraph>
                <Divider/>
                <Title level={3}>Availability</Title>
                <Calendar disabledDate={a => dates.some(b => {return a.date() === b.date() && a.month() === b.month() && a.year() === b.year()})}/>
                <Table dataSource={bookedDatesdataSource} columns={bookedDatescolumns}/>
                <Divider/>
                <Title level={3}>Pending Proposals</Title>
                <Table dataSource={pendingProposalsdataSource} columns={pendingProposalscolumns}/>
            </div>
        )
    }
}

export default PropertyView