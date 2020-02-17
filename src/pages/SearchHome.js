import React, { Component } from "react";
// import axios from "axios";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { getLists } from "../redux/actions/PostActions";

class SearchHome extends Component {
  // state = {
  //   lists: null
  // };

  render() {
    return (
      <div>
        <h1>Search</h1>
      </div>
    );
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
