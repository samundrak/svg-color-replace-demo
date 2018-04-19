import convert from 'color-convert';
import React from 'react';
import tuts from '../tuts.svg';

class SvgApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      svgUrl: tuts,
      colors: [],
    };
    this.colorsPathIndex = new Map();
    this.originalSvg = '';
    this.update = this.setState;
  }
  handleInputChange = e => {
    this.update({
      svgUrl: e.target.value,
    });
  };
  loadSvg = () => {
    fetch(this.state.svgUrl)
      .then(response => response.text())
      .then(plainsvg => {
        document.querySelector('#svg').innerHTML = plainsvg;
        this.originalSvg = document.querySelectorAll('#svg svg path');
        const colors = [];
        Array.from(this.originalSvg).forEach(path => {
          const rgb = path.style.fill.replace(/(r|g|b|\(|\))/g, '').split(',');
          const hex = `#${convert.rgb.hex(...rgb)}`;
          colors.push({
            hex,
            rgb,
          });
          if (!this.colorsPathIndex.get(hex)) {
            this.colorsPathIndex.set(hex, []);
          }
          this.colorsPathIndex.get(hex).push(path);
          this.update({
            colors,
          });
        });
      });
  };
  handleColorChange(color, index) {
    return event => {
      const newcolor = event.target.value;
      const paths = this.colorsPathIndex.get(color.hex);
      Array.from(paths).forEach(path => {
        path.style.fill = newcolor;
      });
      this.colorsPathIndex.set(newcolor.toUpperCase(), [...paths]);
      //   this.colorsPathIndex.delete(color.hex);
      const colors = [].concat(this.state.colors);
      colors[index] = {
        hex: newcolor.toUpperCase(),
        rgb: convert.hex.rgb(newcolor),
      };
      this.update({
        colors,
      });
    };
  }
  handleColorListMouseOver(color, index) {
    return () => {
      console.log(color.hex);
      const paths = this.colorsPathIndex.get(color.hex);
      Array.from(paths || []).forEach(path => {
        path.style.stroke = 'blue';
        path.style.strokeWidth = 20;
      });
    };
  }
  handleColorListMouseOut(color, index) {
    return () => {
      const paths = this.colorsPathIndex.get(color.hex);
      Array.from(paths || []).forEach(path => {
        path.style.stroke = 'none';
        path.style.strokeWidth = 0;
      });
    };
  }
  render() {
    return (
      <div>
        <input
          value={this.state.svgUrl}
          onChange={this.handleInputChange}
          type="text"
        />
        <button onClick={this.loadSvg}>Load svg</button>-
        <hr />
        <div id="svg" />
        <ul>
          {this.state.colors.map((color, index) => (
            <li
              onMouseOver={this.handleColorListMouseOver(color, index)}
              onMouseOut={this.handleColorListMouseOut(color, index)}
              key={index}
              style={{
                display: 'inline-block',
                border: '1px solid',
                padding: '10px',
              }}
            >
              <input
                type="color"
                onChange={this.handleColorChange(color, index)}
                value={color.hex}
              />

              {color.hex}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
export default SvgApp;
