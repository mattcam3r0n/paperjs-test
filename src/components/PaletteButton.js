import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

const PaletteButton = (props) => {
    const { title, onClick, children } = props;
    return (
      <Tooltip title={title}>
        <IconButton size="small" variant="outlined" onClick={onClick}>
          { children }
        </IconButton>
      </Tooltip>
    );
  };

export default PaletteButton;
