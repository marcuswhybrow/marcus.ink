import Beat from './Beat.js';

class Bar extends React.Component {
  render() {
    let className = "bar";
    const barType = this._deriveBarType(this.props.bar[0]);
    if (barType) className += ` bar-${barType}`;

    let nextBarType;
    if (this.props.nextBar)
      nextBarType = this._deriveBarType(this.props.nextBar[0]);

    return React.createElement(
      "div", {
        className: className,
        "data-bar-number": this.props.barNumber,
        "data-next-bar-type": nextBarType,
      },
      ...this.props.bar.slice(1).map(beat => 
        React.createElement(Beat, {names: this.props.names, beat: beat})
      )
    );
  }
  _deriveBarType(input) {
    switch (input) {
      case "|": return "single";
      case "||": return "double";
      case "/||": return "double-bold";
      default: return null;
    }
  }
}

export default Bar;