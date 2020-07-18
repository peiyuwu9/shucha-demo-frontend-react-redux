import React from "react";
import PropTypes from "prop-types";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = {
  cover: {
    backgroundColor: "rgba(0,0,0, 0.3)",
  },
  title: {
    height: 15,
    width: 50,
    backgroundColor: "rgba(0,0,0, 0.4)",
    marginBottom: 5,
  },
  price: {
    height: 15,
    width: 40,
    backgroundColor: "rgba(0,0,0, 0.4)",
    marginBottom: 5,
  },
  likes: {
    height: 20,
    width: 30,
    backgroundColor: "rgba(0,0,0, 0.4)",
    marginBottom: 5,
  },
  button: {
    height: 35,
    width: "90%",
    backgroundColor: "rgba(0,0,0, 0.4)",
  },
};

const PostSkeleton = (props) => {
  const { classes } = props;

  const content = Array.from({ length: 12 }).map((item, index) => (
    <Grid item xs={6} sm={4} md={3} key={index}>
      <Card>
        <CardMedia className={classes.cover} />
        <CardContent>
          <div className={classes.title} />
          <div className={classes.price} />
          <div className={classes.likes} />
          <div className={classes.button} />
        </CardContent>
      </Card>
    </Grid>
  ));

  return <>{content}</>;
};

PostSkeleton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PostSkeleton);
