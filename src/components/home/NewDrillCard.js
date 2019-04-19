import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { AddCircleOutline as AddBoxIcon } from '@material-ui/icons';

const styles = (theme) => ({
  root: {},
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
  icon: {
    fontSize: 120,
    color: 'gray'
  },
});

class NewDrillCard extends Component {
  render() {
    const { classes, drill } = this.props;
    return (
      <Card className={classes.card}>
        <CardActionArea>
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
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Edit
          </Button>
          <Button size="small" color="secondary">
            Delete
          </Button>
        </CardActions>
      </Card>
    );
  }
}

export default withStyles(styles)(NewDrillCard);
