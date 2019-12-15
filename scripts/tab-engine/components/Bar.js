import Beat from './Beat.js';

class Bar extends React.Component {
  render() {
    let className = "bar";
    switch (this.props.bar[0]) {
      case "|": className += " bar-single"; break;
      case "||": className += " bar-double"; break;
      case "/||": className += " bar-double-bold"; break;
    }
    return React.createElement(
      "div", {className: className},
      ...this.props.bar.slice(1).map(beat => 
        React.createElement(Beat, {names: this.props.names, beat: beat})
      )
    );
  }
}

export default Bar;