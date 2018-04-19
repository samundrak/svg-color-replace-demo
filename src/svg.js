// import convert from 'color-convert';
// const colors = new Map();
// const $ = document.querySelector;
// const svg =
//   'http://localhost:9999/converted/10.0.2.85:9999/logo-1523518309362.svg';
// fetch(svg)
//   .then(response => response.text())
//   .then(plainsvg => {
//     document.querySelector('#svg').innerHTML = plainsvg;
//   });

// window.replaceColor = function replace(event) {
//   const svg = document.querySelectorAll('#svg svg path');
//   Array.from(svg).forEach(path => {
//     const rgb = path.style.fill.replace(/(r|g|b|\(|\))/g, '').split(',');
//     const hex = convert.rgb.hex(...rgb);
//     if (!colors.get(hex)) {
//       colors.set(hex, []);
//     }
//     colors.get(hex).push(path);
//   });
// };
import React from 'react';
import { render } from 'react-dom';
import App from './SvgApp';

render(<App />, document.getElementById('root'));
