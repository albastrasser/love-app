import React from 'react';
import axios from 'axios';
import Meter from './Meter';
import Heart from './Heart';

export default class Love extends React.Component {
  constructor() {
    super();
    this.state = {
      name1: '',
      name2: '',
      prevName1: '',
      prevName2: '',
      percentage: '',
      response: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    this.animatedMeter = setInterval(() => this.animate(), 900);
  }

  animate() {
    this.setState({
      percentage: Math.random() * 100,
    });
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  async handleSubmit(event) {
    event.preventDefault();

    let { data } = await axios.get(
      'https://love-calculator.p.rapidapi.com/getPercentage',
      {
        params: { fname: this.state.name1, sname: this.state.name2 },
        headers: {
          'x-rapidapi-key':
            '1b635f7110msh54611c9723c6c1ep1f205fjsn47e519dd187e',
          'x-rapidapi-host': 'love-calculator.p.rapidapi.com',
        },
      }
    );
    clearInterval(this.animatedMeter);

    this.setState((prevState) => {
      return {
        prevName1: prevState.name1,
        prevName2: prevState.name2,
        percentage: data.percentage,
        response: data.result,
        name1: '',
        name2: '',
      };
    });
  }
  componentWillUnmount() {
    clearInterval(this.animatedMeter);
  }
  render() {
    let percentage = this.state.percentage ? Number(this.state.percentage) : 0;
    return (
      <div className="heart-shape">
        <div className="love">
          <h1>Are you compatible???</h1>
          <form onSubmit={this.handleSubmit}>
            <input
              name="name1"
              value={this.state.name1}
              onChange={this.handleChange}
              required
            />
            <input
              name="name2"
              value={this.state.name2}
              onChange={this.handleChange}
              required
            />
            <button type="submit">Let's find out!</button>
          </form>
          {this.state.response && (
            <div>
              <strong>{this.state.prevName1}</strong> and{' '}
              <strong>{this.state.prevName2}</strong> are a{' '}
              <strong>{this.state.percentage}%</strong> match!
              <p>{this.state.response}</p>
            </div>
          )}
          <div>
            <Heart />
          </div>
          <div>
            <Meter percent={percentage / 100} animate={true} />
          </div>
        </div>
      </div>
    );
  }
}
