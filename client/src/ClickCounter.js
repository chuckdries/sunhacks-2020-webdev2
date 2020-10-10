import React from 'react';
import axios from 'axios';

class ClickCounter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicks: -1
    }
  }

  retrieveClickCount = async () => {
    const response = await axios.get('/clicks');
    const clicks = response.data.clicks;
    console.log(clicks);
    this.setState({
      clicks: clicks
    })
  }

  click = async () => {
    const response = await axios.post('/click')
    const clicks = response.data.clicks;
    this.setState({
      clicks: clicks
    })
  }

  componentDidMount() {
    this.retrieveClickCount();
    window.setInterval(() => {
      this.retrieveClickCount()
    }, 5000);
  }

  render() {
    return (
      <div id="click-counter">
        <h2>clicks: {this.state.clicks}</h2>
        <button type="button" onClick={this.click}>click me!</button>
        <button type="button" onClick={this.retrieveClickCount}>load clicks</button>
      </div>
    )
  }
}

export default ClickCounter;
