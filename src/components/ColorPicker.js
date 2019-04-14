import React from 'react';
import { SketchPicker } from 'react-color';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  color: {
    width: '36px',
    height: '14px',
    borderRadius: '2px',
    background: 'rgba(241, 112, 19, 1)',
  },
  swatch: {
    padding: '5px',
    background: '#fff',
    borderRadius: '1px',
    boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
    display: 'inline-block',
    cursor: 'pointer',
  },
  popover: {
    position: 'absolute',
    zIndex: '2',
  },
  cover: {
    position: 'fixed',
    top: '0px',
    right: '0px',
    bottom: '0px',
    left: '0px',
  },
});

class ColorPicker extends React.Component {
  state = {
    displayColorPicker: false,
    color: {
      r: '241',
      g: '112',
      b: '19',
      a: '1',
    },
  };

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker });
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false });
  };

  handleChange = (color) => {
      console.log(color);
    this.setState({ color: color.rgb });
  };

  render() {
    const { classes } = this.props;
    const { color } = this.state;
    const selectedColor = `rgba(${color.r}, ${color.g}, ${
        color.b
      }, ${color.a})`;
    console.log('selected', selectedColor);
    return (
      <div>
        <div className={classes.swatch} onClick={this.handleClick}>
          <div className={classes.color} style={{ background: selectedColor}} />
        </div>
        {this.state.displayColorPicker ? (
          <div className={classes.popover}>
            <div className={classes.cover} onClick={this.handleClose} />
            <SketchPicker
              color={this.state.color}
              onChange={this.handleChange}
            />
          </div>
        ) : null}
      </div>
    );
  }
}

export default withStyles(styles)(ColorPicker);
