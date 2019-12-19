class Parser {
  constructor(input) {
    this.names = {};
    this.chunks = this._parseText(input);
    this.bars = this._deriveBars(this.chunks);
  }

  parseName(input) {
    // Empty input
    if (!input)
      return null;
    const match = input.match(/(.+)\.$/);
    // Unabbreviated input
    if (!match) {
      this.names[input] = 0;
      return [input];
    }
    // Abbreviated input
    return Object.keys(this.names).filter(n => n.indexOf(match[1]) === 0);
  }
  registerVoiceCount(name, voiceCount) {
    this.names[name] = Math.max(this.names[name], voiceCount);
  }

  _parseText(input) {
    let chunks = `${input.trim()}\n\n`.split(/(\n[\s\n]*\n)/);
    if (chunks.length)
      chunks = chunks.slice(0, chunks.length - 1);
    let groups = [];
    let position = 1;
    for (let chunkId = 0; chunkId < chunks.length;) {
      const chunk = chunks[chunkId++];
      const nextChunk = chunks[chunkId++];
      let chunkTail = 0;
      if (nextChunk) {
        if (nextChunk.match(/^\n[\s\n]*\n$/)) {
          chunkTail = (nextChunk.match(/\n/g) || []).length - 1;
        } else {
          // Not sure this can even occure!
          // There cannnot be a subsequent notationSection without trail blank lines.
          console.error("Formatting error: Notation group not followed by at least one blank line.");
        }
      }
      const newChunk = new Parser.Chunk(this, position, chunk, chunkTail);
      groups.push(newChunk);
      position += newChunk.height + chunkTail;
    }
    return groups;
  }
  _deriveBars(chunks) {
    return chunks
      .map((chunk, chunkId) => {
        const finalBar = chunk.bars[chunk.bars.length - 1];
        if (finalBar.length > 1) // No closing barline
          return chunk.bars;
        const nextChunk = chunks[chunkId + 1];
        if (nextChunk && nextChunk.bars[0][0] !== finalBar[0])
          chunk.error("Closing barline incorrect");
        return chunk.bars.slice(0, chunk.bars.length - 1);
      })
      .reduce((accum, bars) => accum.concat(bars));
  }
}
Parser.Chunk = class {
  constructor(parser, position, literal, tail) {
    this.parser = parser;
    this.position = position;
    this.literal = literal;
    this.tail = tail;
    this.lines = this.literal.split(/\s*\n/);
    this.height = this.lines.length;
    this.width = Math.max(...this.lines.map(line => line.length));
    this.gutters = this._deriveGutters(this.lines);
    this.columns = this._deriveColumns(this.gutters, this.lines);
    this.bars = this._parseColumns(this.columns);
    console.log(this.columns);
  }

  error(msg, lineId, columnNumber) {
    let location = "";
    if (lineId !== undefined) {
      location += ` on line ${this.position + lineId}`;
      if (columnNumber !== undefined)
        location += ` column ${columnNumber}`
    } else {
      location += ` in section beginning on line ${this.position}`;
    }
    console.error(`${msg}${location}.\n\n${this._deriveDebugString()}\n\n`);
  }
  _deriveDebugString() {
    const maxTagWidth = (this.position + this.height - 1).toString().length;
    return this.lines.map((line, lineId) => {
      const linePosition = this.position + lineId;
      const lineTag = linePosition.toString().padStart(maxTagWidth + 1, "0");
      return `${lineTag}: ${line}`;
    }).join("\n");
  }

  _deriveGutters(lines) {
    const re = /\s/g;
    return lines.map(line => {
      let match;
      const positions = [];
      while(match = re.exec(line))
        positions.push(match.index);
      return positions;
    }).reduce((result, gutterPositions) => {
      return result.filter(pos => gutterPositions.includes(pos))
    });
  }

  _deriveColumns(gutterPositions, lines) {
    const firstColumn = [lines.map(line => line.substring(0, gutterPositions[0]))];
    return firstColumn.concat(gutterPositions.map((pos, i, ar) => {
      return lines.map(line => line.substring(pos + 1, ar[i + 1]));
    }));
  }

  _isBarLine(column) {
    const trimLine = column[0].trim();
    return column.every(line => line.trim() === trimLine) && trimLine.match(/^\/?\|\|?$/);
  }
  _getMelodyOverrideID(column) {
    let overrideId = null;
    column.map((line, lineId) => {
      if (line.trim() === ">")
        overrideId = lineId;
      if (line.trim().match(/[^>]+/))
        return null;
    });
    return overrideId;
  }
  _isMelodyLine(line) {

  }
  _parseColumns(input) {
    const columns = input.slice();
    let column;
    // Consume names
    let columnsBuffer = [];
    while(column = columns.shift()) {
      if (this._isBarLine(column)) break;
      columnsBuffer.push(column);
    }
    const nameLines = columnsBuffer.reduce((accum, col) => accum.map((text, i) => `${text} ${col[i]}`));
    const names = [];
    nameLines.map((text, lineId, lines) => {
      const trimText = text.trim();
      if (!trimText) {
        const name = names[lineId - 1][0];
        const voiceId = names[lineId - 1][1] + 1;
        names[lineId] = [name, voiceId];
        this.parser.registerVoiceCount(name, voiceId + 1);
        return;
      }
      const matches = this.parser.parseName(trimText);
      switch (matches.length) {
        case 1:
          names[lineId] = [matches[0], 0];
          this.parser.registerVoiceCount(matches[0], 1);
          return;
        case 0:
          this.error(`Abbreviated instrument name "${trimText}" matched no established instrument name`, lineId, 0);
          names[lineId] = [null, 0];
          return;
        default:
          this.error(`Abbreviated instrument name "${trimText}" matched more than one instrument names: ${matches}`, lineId, 0);
          names[lineId] = [null, 0];
          return;
      }
    });
    const bars = [[column[0]]]; // column[0] is always chunks first barline
    let melodyOverrideId = null;
    // Consume bars
    while(column = columns.shift()) {
      let id = this._getMelodyOverrideID(column)
      if (id) {
        melodyOverrideId = id;
        continue;
      }
      if(this._isBarLine(column))
        bars.push([column[0]]);
      else if (column.every(line => !line))
        continue;
      else {
        let beats = [];
        let beatMelody = null;
        column.map((line, lineId) => {
          const trimLine = line.trim();
          if (
            (melodyOverrideId && lineId === melodyOverrideId)
            || (
              trimLine
              && !beatMelody
              && !names[lineId][0].match(/(CHORDS|TAB)/)
            )
          )
            beats.push(beatMelody = ["__MELODY__", 0, trimLine]);
          beats.push([names[lineId][0], names[lineId][1], trimLine]);
        });
        if (!beatMelody)
          beats.push(["__MELODY__", 0, ""]);

        const beatsByName = beats.reduce((accum, beat) => {
          if (beat[1] === 0)
            accum[beat[0]] = [];
          if (beat[2])
            accum[beat[0]][beat[1]] = beat[2];
          return accum;
        }, {});
        bars[bars.length - 1].push(beatsByName);
      }
    }
    return bars;
  }
}

export default Parser;