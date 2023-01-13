/* eslint-disable */
// @ts-nocheck see: https://github.com/kurkle/chartjs-plugin-autocolors/blob/v0.2.1/src/index.js
import {hsv2rgb, rgbString} from '@kurkle/color';

function* hueGen() {
  yield 0;
  for (let i = 1; i < 10; i++) {
    const d = 1 << i;
    for (let j = 1; j <= d; j += 2) {
      yield j / d;
    }
  }
}

function* colorGen(repeat = 1) {
  const hue = hueGen();
  let h = hue.next();
  while (!h.done) {
    let rgb = hsv2rgb(Math.round(h.value * 360), 0.9, 0.8); // LS: increase saturation 0.6 -> 0.9
    for (let i = 0; i < repeat; i++) {
      yield {background: rgbString({r: rgb[0], g: rgb[1], b: rgb[2], a: 192}), border: rgbString({r: rgb[0], g: rgb[1], b: rgb[2], a: 144})};
    }
    rgb = hsv2rgb(Math.round(h.value * 360), 0.6, 0.5);
    for (let i = 0; i < repeat; i++) {
      yield {background: rgbString({r: rgb[0], g: rgb[1], b: rgb[2], a: 192}), border: rgbString({r: rgb[0], g: rgb[1], b: rgb[2], a: 144})};
    }
    h = hue.next();
  }
}

function setColors(dataset, background, border) {
  // dataset.backgroundColor = dataset.backgroundColor || background; // LS: not in use
  // dataset.borderColor = dataset.borderColor || border; // LS: not in use
  dataset.color = dataset.color || background.map((color) => color.replace(/0\.75/, '0.9')); // LS: adopt font color
  return dataset.backgroundColor === background && dataset.borderColor === border;
}

function getNext(color, customize, context) {
  const c = color.next().value;
  if (typeof customize === 'function') {
    return customize(Object.assign({colors: c}, context));
  }
  return c;
}

export default {
  id: 'autocolors',
  beforeUpdate(chart, args, options) {
    const {mode = 'wordcloud', enabled = true, customize, repeat} = options; // LS: change mode for later check

    if (!enabled) {
      return;
    }

    const gen = colorGen(repeat);

    if (options.offset) {
      // offset the color generation by n colors
      for (let i = 0; i < options.offset; i++) {
        gen.next();
      }
    }

    if (mode === 'label') {
      return labelMode(chart, gen, customize);
    }

    const datasetMode = mode === 'dataset';

    let c = getNext(gen, customize, {chart, datasetIndex: 0, dataIndex: datasetMode ? undefined : 0});
    for (const dataset of chart.data.datasets) {
      if (datasetMode) {
        if (setColors(dataset, c.background, c.border)) {
          c = getNext(gen, customize, {chart, datasetIndex: dataset.index});
        }
      } else {
        const background = [];
        const border = [];
        for (let i = 0; i < dataset.data.length; i++) {
          background.push(c.background);
          border.push(c.border);
          c = getNext(gen, customize, {chart, datasetIndex: dataset.index, dataIndex: i});
        }
        setColors(dataset, background, border);
      }
    }
  }
};

function labelMode(chart, gen, customize) {
  const colors = {};
  for (const dataset of chart.data.datasets) {
    const label = dataset.label ?? '';
    if (!colors[label]) {
      colors[label] = getNext(gen, customize, {chart, datasetIndex: 0, dataIndex: undefined, label});
    }
    const c = colors[label];
    setColors(dataset, c.background, c.border);
  }
}
