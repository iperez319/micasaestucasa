import React, { Component } from 'react'
import { List, Card, Icon, Typography, Descriptions, Carousel } from 'antd'
import { withRouter } from 'react-router-dom'
import { MyContext } from 'components/User/UserProvider'

class PropertyGrid extends Component{
    displayDescription = (property) => {
        return(
            <Descriptions border column={{ xxl: 4, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 }}>
                <Descriptions.Item label="Type">Apartment</Descriptions.Item>
                <Descriptions.Item label="Price">$50 - $80 per night</Descriptions.Item>
            </Descriptions>
        )
    }
    goToAddProperty = () => {
        const { history } = this.props
        const { username } = this.context.state.currentUser
        history.push(`/host/${username}/properties/create`)
    }
    goToProperty = (propertyId) => {
        const { history } = this.props
        const { username } = this.context.state.currentUser
        history.push(`/host/${username}/properties/${propertyId}`)
    }
    render(){
        const data = [...this.props.properties, {add: true}]
        const { Title } = Typography;
        const { Meta } = Card;
        // {gutter: 16,xs: 1,sm: 2,md: 4,lg: 4,xl: 6,xxl: 3}
        return(<List grid={{gutter: 16,xs: 1,sm: 2,md: 3,lg: 4,xl: 4,xxl: 3}} dataSource={data} renderItem={item=> (
          (item.add == true)
            ?
                <List.Item>
                    <Card hoverable style={{border: "2px dashed #e8e8e8"}} onClick={this.goToAddProperty}>
                        <Icon type="plus" style={{fontSize: "30px", display: "block", margin: "auto"}}/>
                        <Title level={4} style={{textAlign: "center"}}>Add Property</Title>
                    </Card>
                </List.Item>
             :  
             
                <List.Item>
                    <Card hoverable cover={<img src={item.attrs.imageFiles[0]}></img>} onClick={() => this.goToProperty(item._id)}>
                        <Meta title={<div style={{whiteSpace: "normal", paddingBottom: "5px"}}>{item.attrs.title}</div>} description={this.displayDescription(null)}/>
                    </Card>
                </List.Item>
          )}
          />)
    }
}

PropertyGrid.contextType = MyContext
export default withRouter(PropertyGrid)