import React from 'react';
import uuid from 'uuid';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      message: '',
      messages: [],
    };
  }
  handleSendMessage = () => {
    const data = { message: this.state.message, id: uuid() };
    this.sendDataToWorker(data);
    this.setState({
      message: '',
    });
  };
  sendDataToWorker(data) {
    this.worker.postMessage(data);
  }
  handleTextKeyUp = event => {
    if (event.keyCode === 13) {
      this.handleSendMessage();
      return false;
    }
  };

  handleTextChange = event => {
    this.setState({
      message: event.target.value,
    });
  };

  render() {
    return (
      <div>
        <ul>
          {this.state.messages.map(data => (
            <li key={data.id}>[Worker] - {data.message}</li>
          ))}
        </ul>
        <hr />
        <textarea
          rows="3"
          cols="50"
          value={this.state.message}
          onKeyUp={this.handleTextKeyUp}
          onChange={this.handleTextChange}
        />
        <br />
        <button onClick={this.handleSendMessage}>Send Message to Worker</button>
      </div>
    );
  }

  handleWorkerMessage = event => {
    console.log(event, this);
    // const messages = [].concat(this.state.messages);
    // messages.push(data);
    // this.setState({
    //   messages,
    // });
  };
  componentDidMount() {
    this.worker = new Worker('./worker.js');
    this.worker.onmessage = this.handleWorkerMessage;
  }
}

export default App;
