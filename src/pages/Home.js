import React, { Component, Fragment } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
// import axios from "axios";
import Grid from "@material-ui/core/Grid";
import List from "../components/List";
import PropTypes from "prop-types";
import runshare from "../image/runshare.jpg";

import { connect } from "react-redux";
import { getLists } from "../redux/actions/PostActions";

const styles = {
  home: {
    position: "relative"
  },
  image: {
    width: "100%",
    height: 400,
    objectFit: "cover"
  },
  content: {
    position: "absolute",
    color: "white",
    top: 0,
    left: "8%",
    fontSize: "5em",
    fontFamily: "monospace"
  },
  contentsub: {
    position: "absolute",
    color: "white",
    top: "40%",
    left: "3%",
    fontSize: "1.5em",
    fontFamily: "monospace"
  }
};

class Home extends Component {
  // state = {
  //   lists: null
  // };

  componentDidMount() {
    this.props.getLists();
  }

  render() {
    const { lists, loading } = this.props.post;
    const { classes } = this.props;
    let Readlist = !loading ? (
      lists.map(list => <List key={list.screamId} list={list} />)
    ) : (
      <p>Loading</p>
    );
    return (
      <Fragment>
        <Grid container spacing={10}>
          <Grid item sm={12} xs={12}>
            <div className={classes.home}>
              <img src={runshare} alt="homeimage" className={classes.image} />
              <p className={classes.content}>Runshare</p>
              <p className={classes.contentsub}>
                あなたのおすすめのランニングコース、ウォーキングコースを共有しよう
              </p>
            </div>

            {Readlist}
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

Home.propTypes = {
  getLists: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(
  mapStateToProps,
  { getLists }
)(withStyles(styles)(Home));
