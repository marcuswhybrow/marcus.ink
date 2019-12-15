import Parser from '../parser.js';
import Bar from './Bar.js';

class Piece extends React.Component {
  render() {
    const parser = new Parser(this.props.notation);
    return React.createElement(
      "div", null,
      ...parser.bars.map(bar => 
        React.createElement(Bar, {names: parser.names, bar: bar})
      )
    );
  }
}

export default Piece;