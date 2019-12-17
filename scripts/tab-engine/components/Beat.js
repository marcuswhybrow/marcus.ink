import Instrument from './Instrument.js';

class Beat extends React.Component {
  render() {    
    return React.createElement(
      "div", {className: "beat"},
      ...this._deriveChildren()
    );
  }
  _deriveChildren() {
    const toElements = e => React.createElement(Instrument, {
      name: e[0],
      voiceCount: e[1],
      voices: this.props.beat[e[0]] || [],
      renderStyle: this.props.renderStyle,
    });
    switch (this.props.renderStyle) {
      case "lyric":        
        return [
          ["CHORDS", this.props.names["CHORDS"]],
          ["MELODY", this.props.names["MELODY"]],
        ].map(toElements);
      default:
        return Object.entries(this.props.names).map(toElements);
    }
  }
}

export default Beat;