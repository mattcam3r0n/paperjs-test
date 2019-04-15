import React from 'react';
import { SketchPicker } from 'react-color';
import { withStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';

const styles = (theme) => ({
  button: {
    height: 24,
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
      hex: '#FFFFFF'
    },
  };

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker });
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false });
  };

  handleChange = (color) => {
    this.setState({ color: color.rgb });
    if (this.props.onChange) {
      this.props.onChange(color);
    }
  };

  render() {
    const { classes, label = 'Pick Color', selectedColor = 'white' } = this.props;
    return (
      <div>
        <FormControlLabel
          label={label}
          labelPlacement="top"
          control={
            <Button
              variant="outlined"
              className={classes.button}
              style={{ background: selectedColor }}
              onClick={this.handleClick}
            >&nbsp;</Button>
          }
        />

        {this.state.displayColorPicker ? (
          <div className={classes.popover}>
            <div className={classes.cover} onClick={this.handleClose} />
            <SketchPicker
              color={selectedColor}
              onChange={this.handleChange}
            />
          </div>
        ) : null}
      </div>
    );
  }
}

export default withStyles(styles)(ColorPicker);
