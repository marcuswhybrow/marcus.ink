class Voice extends React.Component {
  render() {
    return React.createElement(
      "div", {
        className: "voice",
        "data-instrument-name": this.props.instrumentName,
        "data-instrument-voice": this.props.instrumentVoice,
      },
      this.props.children ? React.createElement("span", null, this.props.children) : null
    );
  }
}

export default Voice;