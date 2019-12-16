import Parser from '../parser.js';
import Bar from './Bar.js';

class Piece extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      windowWidth: window.innerWidth,
    };
    this.ref = React.createRef();
    this.recheckWindowWidth = () => {
      this.setState({ windowWidth: window.innerWidth });
    };
  }
  render() {
    const parser = new Parser(this.props.notation);
    return React.createElement(
      "div", {ref: this.ref, className: "piece"},
      ...parser.bars.map((bar, barId, bars) => 
        React.createElement(Bar, {
          names: parser.names,
          bar: bar,
          barNumber: barId + 1,
          nextBar: bars[barId + 1],
        })
      ),
      React.createElement("div", {className: "gap"})
    );
  }
  imperativePostProcessing() {
    // Add "bar-last-in-row" class to appropriate bars
    const bars = Object.values(this.ref.current.children);
    bars.map(bar => bar.classList.remove("bar-last-in-row"));
    const barRows = {};
    bars.map(bar => {
      const verticalPos = bar.getBoundingClientRect().top;
      barRows[verticalPos] = barRows[verticalPos] || [];
      barRows[verticalPos].push(bar);
    });
    Object.values(barRows).map(bars => bars[bars.length - 1].classList.add("bar-last-in-row"));

    // Add "instrument-hide" class to any instruments empty for an entire row
    const instruments = Object.values(this.ref.current.getElementsByClassName("instrument"));
    instruments.map(instrument => instrument.classList.remove("instrument-hide"));
    const instrumentRows = {};
    instruments.map(instrument => {
      const verticalPos = instrument.getBoundingClientRect().top;
      instrumentRows[verticalPos] = instrumentRows[verticalPos] || [];
      instrumentRows[verticalPos].push(instrument);
    });
    Object.values(instrumentRows).map(instruments => {
      if (instruments.every(instrument => instrument.getAttribute("data-rest") === "true"))
        instruments.map(instrument => instrument.classList.add("instrument-hide"));
    })

  }
  componentDidMount() {
    window.addEventListener("resize", this.recheckWindowWidth);
    this.imperativePostProcessing();
  }
  componentDidUpdate() {
    this.imperativePostProcessing();
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.recheckWindowWidth);
  }
}

export default Piece;