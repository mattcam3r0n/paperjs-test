import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Edit as EditIcon, Delete as DeleteIcon } from '@material-ui/icons';
import ClampLines from 'react-clamp-lines';

const styles = (theme) => ({
  root: {
  },
  card: {
    maxWidth: 345,
    height: 300,
  },
  media: {
    height: 130,
  },
  description: {
    height: 50,
  },
  buttons: {
    float: 'right'
  }
});

class DrillCard extends Component {
  render() {
    const { classes, drill, onDrillSelected } = this.props;
    return (
      <Card className={classes.card}>
        <CardActionArea onClick={() => onDrillSelected(drill)}>
          <CardMedia
            className={classes.media}
            image="/static/images/cards/contemplative-reptile.jpg"
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {drill.name || 'Drill'}
            </Typography>
            <Typography component="div" className={classes.description}>
              <ClampLines
                text={drill.description || ''}
                lines={3}
                buttons={false}
              />
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions className={classes.buttons}>
          {/* <Button size="small" color="primary">
            <EditIcon />
            Edit
          </Button> */}
          <Button size="small" color="secondary" >
            <DeleteIcon />
          </Button>
        </CardActions>
      </Card>
    );
  }
}

export default withStyles(styles)(DrillCard);
