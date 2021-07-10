import React from 'react';

const Meter = function (props) {
  let {
    percent = 0, // a number between 0 and 1, inclusive
    width = 500, // the overall width
    height = 50, // the overall height
    rounded = true, // if true, use rounded corners
    color = '#96b2f2', // the fill color
    animate = false, // if true, animate when the percent changes
    label = null, // a label to describe the contents (for accessibility)
  } = props;

  let r = rounded ? Math.ceil(height / 2) : 0;
  let w = percent ? Math.max(height, width * Math.min(percent, 1)) : 0;
  let style = animate ? { transition: 'width 500ms, fill 250ms' } : null;

  return (
    <svg width={width} height={height} aria-label={label}>
      <rect width={width} height={height} fill="#c7d7fc" rx={r} ry={r} />
      <rect
        width={w}
        height={height}
        fill={color}
        rx={r}
        ry={r}
        style={style}
      />
    </svg>
  );
};

export default Meter;
