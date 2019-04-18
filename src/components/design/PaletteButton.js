import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

const styles = (theme) => ({
  root: {
    margin: 2,
    padding: 10,
  },
  selected: {
    backgroundColor: '#3f51b5',
    color: 'white',
  },
});

const PaletteButton = (props) => {
  const { title, onClick, children, classes, color = 'default', selected = false } = props;
  return (
    <Tooltip title={title}>
      <IconButton
        size="small"
        variant="outlined"
        onClick={onClick}
        // color={color}
        // classes={{ root: classes.root, colorPrimary: classes.colorPrimary }}
        className={classNames(classes.root, {
          [classes.selected]: selected === true
        })}
      >
        {children}
      </IconButton>
    </Tooltip>
  );
};

export default withStyles(styles)(PaletteButton);
