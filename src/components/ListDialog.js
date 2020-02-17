import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import OnButton from "../util/onButton";
import Comments from "./Comments";
import CommentsForm from "./CommentsForm";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import CloseIcon from "@material-ui/icons/Close";
import Build from "@material-ui/icons/Build";
import ChatIcon from "@material-ui/icons/Chat";

import { connect } from "react-redux";
import { getList, clearErrors } from "../redux/actions/PostActions";

const styles = {
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: "50%",
    objectFit: "cover"
  },
  dialogContent: {
    padding: 20
  },
  closeButton: {
    position: "absolute",
    left: "90%"
  },
  expandButton: {
    position: "absolute",
    left: "90%"
  }
};

class ListDialog extends Component {
  state = {
    open: false,
    oldPath: "",
    newPath: ""
  };
  componentDidMount() {
    if (this.props.openDialog) {
      this.onOpen();
    }
  }
  onOpen = () => {
    this.setState({ open: true });
    this.props.getList(this.props.screamId);
    let oldPath = window.location.pathname;

    const { userHandle, screamId } = this.props;
    const newPath = `/users/${userHandle}/scream/${screamId}`;

    if (oldPath === newPath) oldPath = `/users/${userHandle}`;

    window.history.pushState(null, null, newPath);
    console.log(oldPath);
    console.log(newPath);
    this.setState({ open: true, oldPath, newPath });
    this.props.getList(this.props.screamId);
  };
  onClose = () => {
    // this.setState({ open: false });
    window.history.pushState(null, null, this.state.oldPath);
    this.setState({ open: false });
    this.props.clearErrors();
  };

  render() {
    const {
      classes,
      list: {
        screamId,
        body,
        createdAt,
        commentCount,
        userImage,
        userHandle,
        comments
      },
      front: { loading }
    } = this.props;

    const dialogMarkup = loading ? (
      <div className={classes.spinnerDiv}>
        <CircularProgress size={200} thickness={2} />
      </div>
    ) : (
      <Grid container spacing={16}>
        <Grid item sm={5}>
          <img src={userImage} alt="Profile" className={classes.profileImage} />
        </Grid>
        <Grid item sm={7}>
          <Typography
            component={Link}
            color="primary"
            variant="h5"
            to={`/users/${userHandle}`}
          >
            @{userHandle}
          </Typography>
          <hr className={classes.invisibleSeparator} />
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).format("h:mm a, MMMM DD YYYY")}
          </Typography>
          <hr className={classes.invisibleSeparator} />
          <Typography variant="body1">{body}</Typography>
          <OnButton tip="comments">
            <ChatIcon color="primary" />
          </OnButton>
          <span>{commentCount} comments</span>
        </Grid>
        <hr className={classes.visibleSeparator} />
        <CommentsForm screamId={screamId} />
        <Comments comments={comments} />
      </Grid>
    );
    return (
      <Fragment>
        <OnButton
          onClick={this.onOpen}
          tip="詳細"
          tipClassName={classes.expandButton}
        >
          <Build color="primary" />
        </OnButton>
        {/* closeボタン */}
        <Dialog
          open={this.state.open}
          onClose={this.onClose}
          fullWidth
          maxWidth="sm"
        >
          <OnButton
            tip="Close"
            onClick={this.onClose}
            tipClassName={classes.closeButton}
          >
            <CloseIcon />
          </OnButton>
          <DialogContent className={classes.dialogContent}>
            {dialogMarkup}
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

ListDialog.propTypes = {
  clearErrors: PropTypes.func.isRequired,
  getList: PropTypes.func.isRequired,
  screamId: PropTypes.string.isRequired,
  userHandle: PropTypes.string.isRequired,
  list: PropTypes.object.isRequired,
  front: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  list: state.post.list,
  front: state.front
});

const mapActionsToProps = {
  getList,
  clearErrors
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(ListDialog));
