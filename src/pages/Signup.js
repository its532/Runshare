import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";

import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Link } from "react-router-dom";

// import axios from "axios";

import { connect } from "react-redux";
import { signupAction } from "../redux/actions/UserActions";

const styles = {};

const currencies = [
  {
    value: "Man",
    label: "男性"
  },
  {
    value: "Women",
    label: "女性"
  }
];

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      handle: "",
      gender: "",
      loading: false,
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    this.setState({
      loading: true
    });
    const newUserData = {
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      handle: this.state.handle,
      gender: this.state.gender
    };

    // console.log(newUserData);

    this.props.signupAction(newUserData, this.props.history);
    //登録ユーザー情報送信　成功すればtrueに
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.front.errors) {
      this.setState({ errors: nextProps.front.errors });
    }
  }
  render() {
    const {
      classes,
      front: { loading }
    } = this.props;
    const { errors } = this.state;
    return (
      <Grid container className={classes.form}>
        <Grid item sm />
        <Grid item sm>
          <Typography variant="h3" className={classes.pageTitle}>
            Signup
          </Typography>
          <form noValidate onSubmit={this.onSubmit}>
            <TextField
              id="email"
              name="email"
              type="email"
              label="Email"
              className={classes.textField}
              helperText={errors.email}
              error={errors.email ? true : false}
              value={this.state.email}
              onChange={this.onChange}
              fullWidth
            />
            <TextField
              id="password"
              name="password"
              type="password"
              label="Password"
              className={classes.textField}
              helperText={errors.password}
              error={errors.password ? true : false}
              value={this.state.password}
              onChange={this.onChange}
              fullWidth
            />
            <TextField
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              label="Confirm Password"
              className={classes.textField}
              helperText={errors.confirmPassword}
              error={errors.confirmPassword ? true : false}
              value={this.state.confirmPassword}
              onChange={this.onChange}
              fullWidth
            />
            <TextField
              id="handle"
              name="handle"
              type="text"
              label="ユーザ名"
              className={classes.textField}
              helperText={errors.handle}
              error={errors.handle ? true : false}
              value={this.state.handle}
              onChange={this.onChange}
              fullWidth
            />
            <TextField
              id="gender"
              name="gender"
              select
              label="性別"
              className={classes.textField}
              helperText={errors.gender}
              error={errors.gender ? true : false}
              value={this.state.gender}
              onChange={this.onChange}
              fullWidth
            >
              {currencies.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            {errors.general && (
              <Typography variant="body2" className={classes.customError}>
                {errors.general}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              className={classes.button}
              // disabled={loading}
            >
              Signup
              {loading && (
                <CircularProgress size={30} className={classes.progress} />
              )}
            </Button>
            <br />
            <small>
              アカウントをお持ちの方はこちらから <Link to="/login">Login</Link>
            </small>
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    );
  }
}

Signup.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  front: PropTypes.object.isRequired,
  signupAction: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.user,
  front: state.front
});

export default connect(
  mapStateToProps,
  { signupAction }
)(withStyles(styles)(Signup));
