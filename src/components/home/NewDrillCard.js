import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { AddCircleOutline as AddBoxIcon } from '@material-ui/icons';

const styles = (theme) => ({
  root: {},
  card: {
    maxWidth: 345,
    height: 300
  },
  media: {
    height: 130,
  },
  icon: {
    fontSize: 120,
    color: 'gray'
  },
});

class NewDrillCard extends Component {
  render() {
    const { classes, onNewDrillSelected } = this.props;
    return (
      <Card className={classes.card}>
        <CardActionArea onClick={onNewDrillSelected}>
          <CardContent className={classes.media}>
            <Grid container justify="center" alignItems="center">
              <Grid item>
                <AddBoxIcon className={classes.icon} />
              </Grid>
            </Grid>
          </CardContent>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              New Drill
            </Typography>
            <Typography component="p">
              Start a new drill.
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
        </CardActions>
      </Card>
    );
  }
}

export default withStyles(styles)(NewDrillCard);
