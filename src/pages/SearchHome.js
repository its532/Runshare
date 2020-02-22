import React, { Component, Fragment } from "react";
// import axios from "axios";
import PropTypes from "prop-types";
import List from "../components/List";

import { connect } from "react-redux";
import { getLists } from "../redux/actions/PostActions";

class SearchHome extends Component {
  componentDidMount() {
    this.props.getLists();
  }

  render() {
    const { lists, loading } = this.props.post;

    let searchlist = !loading ? (
      lists.map(list => <List key={list.screamId} list={list} />)
    ) : (
      <p>Loading</p>
    );
    return <Fragment>{searchlist}</Fragment>;
  }
}
SearchHome.propTypes = {
  getLists: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(
  mapStateToProps,
  { getLists }
)(SearchHome);
