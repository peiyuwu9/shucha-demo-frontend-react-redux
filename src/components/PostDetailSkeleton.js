import React from "react";
import PropTypes from "prop-types";

import DialogContent from "@material-ui/core/DialogContent";
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = {
  cover: {
    height: 180,
    width: 180,
    backgroundColor: "rgba(0,0,0, 0.3)",
    marginBottom: 5,
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
  commentBody: {
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

  return (
    <>
      <DialogContent>
        <Grid container>
          <Grid item xs={12} sm={4} md={3}>
            <div className="detail-post-card">
              <div className={classes.cover} />
              <div className={classes.title} />
              <div className={classes.price} />
              <div className={classes.button} />
            </div>
          </Grid>
          <Grid item xs={12} sm={8} md={9}>
            <div className={classes.title} />
            <div className={classes.title} />
            <div className={classes.commentBody} />
            <div className={classes.title} />
            <div className={classes.commentBody} />
            <div className={classes.button} />
          </Grid>
        </Grid>
      </DialogContent>
    </>
  );
};

PostSkeleton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PostSkeleton);
