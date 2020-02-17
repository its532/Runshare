import React, { Component } from "react";
import { Link } from "react-router-dom";
import Profile from "./Profile";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import { fade } from "@material-ui/core/styles";
import withStyles from "@material-ui/core/styles/withStyles";

import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import PostList from "./PostList";

import Notifications from "./Notifications";

import { searchLists } from "../redux/actions/PostActions";

const styles = theme => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200
    }
  },
  profile: {
    "& .image": {
      textAlign: "center",
      // position: "relative",
      left: "10%"
    },
    "& .profile": {
      width: 60,
      height: 60,
      objectFit: "cover",
      maxWidth: "100%",
      borderRadius: "50%"
    }
  }
});

class Navbar extends Component {
  state = {
    body: "",
    newPath: "",
    open: false
  };
  handleOpen = () => {
    this.setState({ open: true });
  };
  onClose = () => {
    this.setState({ open: false });
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const newPath = "/scream";
    window.history.pushState(null, null, newPath);
    this.setState({ newPath });
    this.props.searchLists({ body: this.state.body });
    //登録ユーザー情報送信　成功すればtrueに
  };
  render() {
    const {
      classes,
      user: {
        authenticated,
        credentials: { imageUrl }
      }
    } = this.props;

    const Image = authenticated ? (
      <React.Fragment>
        <form component={Link} to="/scream" onSubmit={this.onSubmit}>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              name="body"
              placeholder="都道府県検索"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
              inputProps={{ "aria-label": "search" }}
              onChange={this.onChange}
            />
          </div>
        </form>
        <IconButton onClick={this.handleOpen} className={classes.profile}>
          <div className="image">
            <img src={imageUrl} alt="profile" className="profile" />
          </div>
        </IconButton>
        <Dialog
          open={this.state.open}
          onClose={this.onClose}
          fullWidth
          maxWidth="sm"
        >
          <Profile />
        </Dialog>
      </React.Fragment>
    ) : null;

    return (
      <AppBar position="fixed">
        <Toolbar className="nav-container">
          <PostList></PostList>
          <Button color="inherit" component={Link} to="/login">
            Login
          </Button>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/signup">
            Signup
          </Button>
          <Notifications />

          {Image}
        </Toolbar>
      </AppBar>
    );
  }
}

Navbar.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  searchLists: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  authenticated: state.user.authenticated,
  user: state.user
});

export default connect(
  mapStateToProps,
  { searchLists }
)(withStyles(styles)(Navbar));
