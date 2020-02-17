import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import List from "../components/List";
import StaticProfile from "../components/StaticProfile";
import Grid from "@material-ui/core/Grid";

import { connect } from "react-redux";
import { getUserData } from "../redux/actions/PostActions";

class User extends Component {
  state = {
    profile: null,
    listIdParam: null
  };
  componentDidMount() {
    const handle = this.props.match.params.handle;
    const screamId = this.props.match.params.screamId;

    if (screamId) this.setState({ listIdParam: screamId });

    this.props.getUserData(handle);
    axios
      .get(`/user/${handle}`)
      .then(res => {
        this.setState({
          profile: res.data.user
        });
      })
      .catch(err => console.log(err));
  }
  render() {
    const { lists, loading } = this.props.post;
    const { listIdParam } = this.state;

    const ListsMarkup = loading ? (
      <p>Loading...</p>
    ) : lists === null ? (
      <p>No Lists from this user</p>
    ) : !listIdParam ? (
      lists.map(list => <List key={list.screamId} list={list} />)
    ) : (
      lists.map(list => {
        if (list.screamId !== listIdParam)
          return <List key={list.screamId} list={list} />;
        else return <List key={list.screamId} list={list} openDialog />;
      })
    );

    return (
      <Grid container spacing={10}>
        <Grid item sm={8} xs={12}>
          {ListsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          {this.state.profile === null ? (
            <p>Loading..</p>
          ) : (
            <StaticProfile profile={this.state.profile} />
          )}
        </Grid>
      </Grid>
    );
  }
}

User.propTypes = {
  getUserData: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(
  mapStateToProps,
  { getUserData }
)(User);
