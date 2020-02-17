import React, { Component } from "react";
import OnButton from "../util/onButton";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";

import { connect } from "react-redux";
import { likeList, unlikeList } from "../redux/actions/PostActions";

export class LikeButton extends Component {
  likedList = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find(like => like.screamId === this.props.screamId)
    )
      return true;
    else return false;
  };
  likeList = () => {
    this.props.likeList(this.props.screamId);
  };
  unlikeList = () => {
    this.props.unlikeList(this.props.screamId);
  };
  render() {
    const { authenticated } = this.props.user;
    const likeButton = !authenticated ? (
      <Link to="/login">
        <OnButton tip="いいね">
          <FavoriteBorder color="primary" />
        </OnButton>
      </Link>
    ) : this.likedList() ? (
      <OnButton tip="いいね解除" onClick={this.unlikeScream}>
        <FavoriteIcon color="primary" />
      </OnButton>
    ) : (
      <OnButton tip="Like" onClick={this.likeScream}>
        <FavoriteBorder color="primary" />
      </OnButton>
    );
    return likeButton;
  }
}

LikeButton.propTypes = {
  user: PropTypes.object.isRequired,
  screamId: PropTypes.string.isRequired,
  likeList: PropTypes.func.isRequired,
  unlikeList: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

const mapActionsToProps = {
  likeList,
  unlikeList
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(LikeButton);
