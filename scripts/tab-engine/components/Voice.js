class Voice extends React.Component {
  render() {
    let text;
    let className = "voice";
    if (this.props.children) {
      const matches = this.props.children.match(/(.*)-$/);
      if (matches) {
        text = matches[1];
        text = this.props.children;
        className += " voice-mid-word";
      } else {
        text = this.props.children;
      }
    }
    
    return React.createElement(
      "div", {
        className: className,
        "data-instrument-name": this.props.instrumentName,
        "data-instrument-voice": this.props.instrumentVoice,
      },
      (text) ? React.createElement("span", null, text) : null
    );
  }
}

export default Voice;