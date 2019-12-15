import Instrument from './Instrument.js';

class Beat extends React.Component {
  render() {
    return React.createElement(
      "div", {className: "beat"},
      ...Object.entries(this.props.names).map(e => 
        React.createElement(Instrument, {
          name: e[0],
          voiceCount: e[1],
          voices: this.props.beat[e[0]] || []
        })
      )
    );
  }
}

export default Beat;