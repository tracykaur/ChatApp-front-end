import React, { Component } from 'react';
import { Message, MessageBody, MessageHeader } from 'reactbulma';
import axios from 'axios';
import './App.css';

class App extends Component {

  // Create a messages array, and set the name and message input values to an empty string, in state
  state = {
    messages: [],
    nameInput: '',
    messageInput: ''
  }

  // 
  addMessage = (event) => {
    // Prevent the browser from refreshing upon pressing button
    event.preventDefault();

    // Make copy of current messages
    const currentMessages = [...this.state.messages];

    if (this.state.nameInput && this.state.messageInput) {

      axios.post('/api/messages', {
        user: this.state.nameInput,
        content: this.state.messageInput
      })
        .then((response) => {
          console.log(response.data);
          currentMessages.unshift(response.data);
          this.setState({
            messages: currentMessages,
            nameInput: '',
            messageInput: ''
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    };
  }

  refreshMessages = () => {

    axios.get('/api/messages')
      .then((response) => {
        console.log('Response!');
        console.log(response.data);
        this.setState({
          messages: response.data
        })
      })
  }



  // When user enters text in the field, change the state with the entered string
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {

    // Destructure props
    const { messages, nameInput, messageInput } = this.state

    return (
      <div className="App">
      <Field 
        <input onChange={this.handleChange} placeholder='Username' name='nameInput' />
        <br />
        <textarea onChange={this.handleChange} placeholder='Message' name='messageInput' />
        <br />
        <button onClick={this.addMessage}>Submit</button>
        {
          messages.map((message) => (
            <Message info >
              <Message.Header>
                <p><b>{message.user}</b></p>
              </Message.Header>
              <Message.Body>
                <p>{message.content}</p>
              </Message.Body>
            </Message>
          ))
        }
      </div>
    );
  }

  componentDidMount() {
    setInterval(this.refreshMessages, 10000);
    axios.get('/api/messages')
      .then((response) => {
        console.log('Response!');
        console.log(response.data);
        this.setState({
          messages: response.data
        })
      })
  }
}

export default App;

const preventDefault = (fn) => (event) => {
  event.preventDefault();
  if (fn) {
    fn(event);
  }
};
