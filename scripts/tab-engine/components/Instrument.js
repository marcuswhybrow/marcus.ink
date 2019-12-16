import Voice from './Voice.js';

class Instrument extends React.Component {
  render() {
    return React.createElement(
      "div", {
        className: `instrument instrument-${this.props.voiceCount > 1 ? "multi" : "single"}-voice`,
        "data-name": this.props.name,
        "data-voice-count": this.props.voiceCount,
        "data-rest": this.props.voices.length === 0,
      },
      ...Array.apply(null, Array(this.props.voiceCount)).map((el, voiceId) =>
        React.createElement(Voice, {
          instrumentName: this.props.name,
          instrumentVoice: voiceId + 1,
        }, this.props.voices[voiceId])
      )
    )
  }
}

export default Instrument;