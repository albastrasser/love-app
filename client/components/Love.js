import React from 'react';
import axios from 'axios';
import Meter from './Meter';

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
    this.generatePhrase = this.generatePhrase.bind(this);
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

  generatePhrase(pcent) {
    let memo = {
      0: 'Wow. Never gonna happen. Sorry boo.',
      1: `Maybe with some emotional manipulation this might work out. Or if you're just desperate I suppose.`,
      2: 'I hope your self worth is greater than your compatibility with this fool.',
      3: `You're still more compatible than Kim K and Kanye.`,
      4: 'Not exactly pb & j, but maybe pb and.... oyster sauce?',
      5: 'Settling can be good! Not all of us were meant to shoot for the stars.',
      6: `If you were trying to pass a test you'd fail, but you could probably do worse when it comes to love.`,
      7: `Stunningly average. Totally satisfactory. The middle of the road aint a bad place to be.`,
      8: `Congrats! You probably won't kill each other before you stop remembering each other's names.`,
      9: `Go get married. You won't find anything better than this.`,
    };
    if (pcent.length === 1) {
      return memo[0];
    } else {
      return memo[pcent[0]];
    }
  }

  async handleSubmit(event) {
    event.preventDefault();

    let { data } = await axios.get(
      'https://love-calculator.p.rapidapi.com/getPercentage',
      {
        params: { fname: this.state.name1, sname: this.state.name2 },
        headers: {
          'x-rapidapi-key': process.env.REACT_APP_LOVECALCKEY,
          'x-rapidapi-host': 'love-calculator.p.rapidapi.com',
        },
      }
    );
    clearInterval(this.animatedMeter);

    let phrase = this.generatePhrase(data.percentage);

    this.setState((prevState) => {
      return {
        prevName1: prevState.name1,
        prevName2: prevState.name2,
        percentage: data.percentage,
        response: phrase,
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
        <div className="flex">
          <h1>Are you compatible???</h1>
          <form onSubmit={this.handleSubmit}>
            <h3> First Person: </h3>
            <input
              name="name1"
              value={this.state.name1}
              onChange={this.handleChange}
              required
            />{' '}
            <br />
            <h3> Second Person: </h3>
            <input
              name="name2"
              value={this.state.name2}
              onChange={this.handleChange}
              required
            />{' '}
            <br />
            <br />
            <button type="submit" className="submit">
              Let's find out!
            </button>
          </form>
          {this.state.response && (
            <div id='res'>
              <strong>{this.state.prevName1}</strong> and{' '}
              <strong>{this.state.prevName2}</strong> are a{' '}
              <strong>{this.state.percentage}%</strong> match!
              <p>{this.state.response}</p>
            </div>
          )}
          <div id="meter">
            <Meter percent={percentage / 100} animate={true} />
          </div>
        </div>
      </div>
    );
  }
}
