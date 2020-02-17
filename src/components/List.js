import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
// import Tooltip from "@material-ui/core/Tooltip";
import ChatIcon from "@material-ui/icons/Chat";
import OnButton from "../util/onButton";
import ListDialog from "./ListDialog.js";
import DeleteList from "./DeleteList";
import Upload from "./Upload";

import PropTypes from "prop-types";

import { connect } from "react-redux";
import { likeList, unlikeList, uploadPost } from "../redux/actions/PostActions";

import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
// import LocationOn from "@material-ui/icons/LocationOn";

const styles = {
  user: {
    position: "relative",
    display: "flex",
    marginBottom: 30,
    "& .place": {
      textAlign: "center",
      "& span, svg": {
        verticalAlign: "middle"
      }
    }
  },
  image: {
    minWidth: 200
  },
  content: {
    padding: 25,
    objectFit: "cover"
  },
  upload: {
    padding: 25
  }
};

class List extends Component {
  likedList = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find(
        like => like.screamId === this.props.list.screamId
      )
    )
      return true;
    else return false;
  };
  likeList = () => {
    console.log(this.props.list.screamId);

    this.props.likeList(this.props.list.screamId);
  };
  unlikeList = () => {
    this.props.unlikeList(this.props.list.screamId);
  };
  render() {
    dayjs.extend(relativeTime);
    const {
      classes,
      list: {
        body,
        place,
        createdAt,
        postImage,
        userHandle,
        screamId,
        likeCount,
        commentCount
      },
      user: {
        authenticated,
        credentials: { handle }
      }
    } = this.props;

    const likeButton = !authenticated ? (
      <Link to="/login">
        <OnButton tip="Like">
          <FavoriteBorder color="primary" />
        </OnButton>
      </Link>
    ) : this.likedList() ? (
      <OnButton tip="いいね解除" onClick={this.unlikeList}>
        <FavoriteIcon color="primary" />
      </OnButton>
    ) : (
      <OnButton tip="いいね" onClick={this.likeList}>
        <FavoriteBorder color="primary" />
      </OnButton>
    );

    const deleteButton =
      authenticated && userHandle === handle ? (
        <DeleteList screamId={screamId} />
      ) : null;

    const upload =
      authenticated && userHandle === handle ? (
        <Upload screamId={screamId} />
      ) : null;

    return (
      <Card className={classes.user}>
        <CardMedia
          image={postImage}
          title="Profile image"
          className={classes.image}
        />
        <CardContent className={classes.content}>
          <Typography
            variant="h5"
            component={Link}
            to={`/users/${userHandle}`}
            color="primary"
          >
            {userHandle}
          </Typography>
          {deleteButton}
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).fromNow()}
          </Typography>
          <Typography variant="body1">{body}</Typography>
          <Typography variant="overline">{place}</Typography>

          {likeButton}
          <span>{likeCount} </span>
          <OnButton tip="コメント">
            <ChatIcon color="primary" />
          </OnButton>
          <span>{commentCount}</span>
          <span className={classes.upload}>{upload}</span>
          <ListDialog
            screamId={screamId}
            userHandle={userHandle}
            openDialog={this.props.openDialog}
          />
        </CardContent>
      </Card>
    );
  }
}

List.propTypes = {
  uploadPost: PropTypes.func.isRequired,
  likeList: PropTypes.func.isRequired,
  unlikeList: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  list: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  openDialog: PropTypes.bool
};

const mapStateToProps = state => ({
  user: state.user
  //storeのstateの状態を返す
});

const mapActionsToProps = {
  uploadPost,
  likeList,
  unlikeList
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(List));
