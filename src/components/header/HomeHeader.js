import React from 'react';
//import { observer, inject } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

const styles = (theme) => ({
});

// @inject('designViewState', 'drillState')
// @observer
class HomeHeader extends React.Component {
  state = {};

  render() {
    return (
      <Button color="inherit" component={Link} to="/about">
        About
      </Button>
    );
  }
}

export default withStyles(styles)(HomeHeader);
