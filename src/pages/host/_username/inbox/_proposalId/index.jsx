import React, { Component } from 'react'
import { Comment, Avatar, Form, Button, List, Input } from 'antd';
import moment from 'moment';
import Proposal from 'models/Proposal'
const { TextArea } = Input;


const CommentList = ({ comments }) => {
    console.log(comments)
    const newComments = comments.map((value) => {
        return {author: value.author, content: <p>{value.content}</p>, datetime: moment(value.datetime).fromNow()}
    })
    return (
        <List
          dataSource={newComments}
          header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
          itemLayout="horizontal"
          renderItem={props => <Comment {...props} />}
        />
      );
}


const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <div>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
        Add Comment
      </Button>
    </Form.Item>
  </div>
);

class InboxDetail extends React.Component {
  state = {
    comments: [],
    submitting: false,
    value: '',
  };

  handleSubmit = async () => {

    const { proposalId } = this.props.match.params

    if (!this.state.value) {
      return;
    }

    this.setState({
      submitting: true,
    });

    const proposal = await Proposal.findById(proposalId)
    proposal.update({messages: [{author: `${proposal.attrs.user}(Host)`, content: this.state.value, datetime: (new Date()).toString()}, ...proposal.attrs.messages]})
    await proposal.save()
    this.setState({
        submitting: false,
        value: ''
      });
  };

  handleChange = e => {
    this.setState({
      value: e.target.value,
    });
  };

  streamCallback = (proposal) => {
    const { proposalId } = this.props.match.params
    if(proposal._id == proposalId){
        if(proposal.attrs.messages.length > this.state.comments.length){
            this.setState({comments: proposal.attrs.messages})
        }
    }
  }

  componentWillMount(){
      Proposal.addStreamListener(this.streamCallback)
  }
  componentWillUnmount(){
      Proposal.removeStreamListener(this.streamCallback)
  }

  async componentDidMount(){
     const { proposalId } = this.props.match.params
     const proposal = await Proposal.findById(proposalId)
     
     this.setState({comments: proposal.attrs.messages})
  }
  

  render() {
    const { comments, submitting, value } = this.state;

    return (
      <div>
        {comments.length > 0 && <CommentList comments={comments} />}
        <Comment
          content={
            <Editor
              onChange={this.handleChange}
              onSubmit={this.handleSubmit}
              submitting={submitting}
              value={value}
            />
          }
        />
      </div>
    );
  }
}
export default InboxDetail