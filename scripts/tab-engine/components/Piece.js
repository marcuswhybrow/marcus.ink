import Parser from '../parser.js';
import Bar from './Bar.js';
import Beat from './Beat.js';

class Banner extends React.Component {
  render() {
    return React.createElement("div", {id: "banner"},
      React.createElement("div", null,
        React.createElement("a", {href: "/songs/"}, "Songs"),
        this.props.selector
          ? React.createElement(Selector, {renderStyle: this.props.renderStyle, setStyle: this.props.setStyle})
          : null,
      )
    );
  }
}

class Selector extends React.Component {
  render() {
    return React.createElement(
      "div",
      {className:"selector"},
      React.createElement("span", {
        className: this.props.renderStyle === "lyric" ? "active" : null,
        onClick: this.setStyle.bind(this, "lyric")
      }, "L"),
      React.createElement("span", {
        className: this.props.renderStyle === "chord" ? "active" : null,
        onClick: this.setStyle.bind(this, "chord")
      }, "C"),
      React.createElement("span", {
        className: this.props.renderStyle === "bar" ? "active" : null,
        onClick: this.setStyle.bind(this, "bar")
      }, "B")
    )
  }

  setStyle(style) {
    this.props.setStyle(style);
  }
}

class Piece extends React.Component {
  constructor(props) {
    super(props);
    let renderStyle;
    if (!this.props.notation)
      renderStyle = "lyric";
    else
      renderStyle = Cookies.get()["style"] || "lyric";
    this.state = {
      windowWidth: window.innerWidth,
      renderStyle: renderStyle,
    };
    this.ref = React.createRef();
    this.recheckWindowWidth = () => {
      this.setState({ windowWidth: window.innerWidth });
    };
    this.setStyle = (style) => {
      Cookies.set("style", style);
      this.setState({ renderStyle: style });
    }
  }
  render() {
    return React.createElement(
      "div",
      {ref: this.ref, className: `piece piece-${this.state.renderStyle}-style`},
      React.createElement(Banner, {renderStyle: this.state.renderStyle, setStyle: this.setStyle, selector: Boolean(this.props.notation)}),
      React.createElement("div", {className: "content"}, ...this._deriveChildren())
    );
  }
  _deriveChildren() {
    if (this.state.renderStyle === "lyric")
      return [React.createElement("div", {className: "lyrics", dangerouslySetInnerHTML: {__html: this.props.lyricsHTML }})];
    const parser = new Parser(this.props.notation);
    switch (this.state.renderStyle) {
      case "chord":
        return parser.bars.map((bar, barId, bars) => {
          return (
            bar[0] === "||"
              ? [React.createElement("div", {className: "section-break"})]
              : []
          ).concat(bar.slice(1).map(beat =>
              React.createElement(Beat, {
                names: parser.names,
                beat: beat,
                renderStyle: this.state.renderStyle,
              })
            ));
        }).reduce((accum, beats) => accum.concat(beats));
      case "bar":
      default:
        return [parser.bars.map((bar, barId, bars) => 
            React.createElement(Bar, {
              key: barId,
              names: parser.names,
              bar: bar,
              barNumber: barId + 1,
              nextBar: bars[barId + 1],
              renderStyle: this.state.renderStyle,
            })
          ),
          React.createElement("div", {className: "gap"})
        ];
    }
  }
  _barPostProcessing() {
    // Add "bar-last-in-row" class to appropriate bars
    const bars = Object.values(this.ref.current.children);
    bars.map(bar => bar.classList.remove("bar-first-in-row", "bar-last-in-row"));
    const barRows = {};
    bars.map(bar => {
      const verticalPos = bar.getBoundingClientRect().top;
      barRows[verticalPos] = barRows[verticalPos] || [];
      barRows[verticalPos].push(bar);
    });
    Object.values(barRows).map(bars => {
      bars[0].classList.add("bar-first-in-row");
      bars[bars.length - 1].classList.add("bar-last-in-row")
    });

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
  imperativePostProcessing(prevProps, prevState) {
    switch(this.state.renderStyle) {
      case "bar":
        if (prevState && prevState.renderStyle === "bar")
          if (prevState.windowWidth !== this.state.windowWidth)
            return this._barPostProcessing();
        return this._barPostProcessing();
      case "lyric":
      default:
    }
  }
  componentDidMount(prevProps, prevState) {
    window.addEventListener("resize", this.recheckWindowWidth);
    this.imperativePostProcessing(prevProps, prevState);
  }
  componentDidUpdate(prevProps, prevState) {
    this.imperativePostProcessing(prevProps, prevState);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.recheckWindowWidth);
  }
}

export default Piece;