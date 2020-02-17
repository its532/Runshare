import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import OnButton from "../util/onButton";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
import MenuItem from "@material-ui/core/MenuItem";

import Create from "@material-ui/icons/Create";
import CloseIcon from "@material-ui/icons/Close";
import { connect } from "react-redux";
import { postList, clearErrors } from "../redux/actions/PostActions";

const styles = theme => ({
  submitButton: {
    position: "relative",
    float: "right",
    marginTop: 10
  },
  progressSpinner: {
    position: "absolute"
  },
  closeButton: {
    position: "absolute",
    left: "90%",
    top: "6%"
  },
  textField: {
    marginBottom: 30
  }
});

const prefectures = [
  {
    value: "北海道",
    label: "北海道"
  },
  {
    value: "青森",
    label: "青森"
  },

  {
    value: "岩手",
    label: "岩手"
  },
  {
    value: "宮城",
    label: "宮城"
  },
  {
    value: "秋田",
    label: "秋田"
  },
  {
    value: "山形",
    label: "山形"
  },
  {
    value: "福島",
    label: "福島"
  },
  {
    value: "茨城",
    label: "茨城"
  },

  {
    value: "栃木",
    label: "栃木"
  },
  {
    value: "群馬",
    label: "群馬"
  },
  {
    value: "埼玉",
    label: "埼玉"
  },
  {
    value: "群馬",
    label: "群馬"
  },
  {
    value: "千葉",
    label: "千葉"
  },
  {
    value: "東京",
    label: "東京"
  },
  {
    value: "神奈川",
    label: "神奈川"
  },
  {
    value: "新潟",
    label: "新潟"
  },
  {
    value: "富山",
    label: "富山"
  },
  {
    value: "石川",
    label: "石川"
  },
  {
    value: "福井",
    label: "福井"
  },
  {
    value: "山梨",
    label: "山梨"
  },
  {
    value: "長野",
    label: "長野"
  },
  {
    value: "岐阜",
    label: "岐阜"
  },
  {
    value: "静岡",
    label: "静岡"
  },
  {
    value: "愛知",
    label: "愛知"
  },
  {
    value: "三重",
    label: "三重"
  },
  {
    value: "滋賀",
    label: "滋賀"
  },
  {
    value: "京都",
    label: "京都"
  },
  {
    value: "大阪",
    label: "大阪"
  },
  {
    value: "兵庫",
    label: "兵庫"
  },
  {
    value: "奈良",
    label: "奈良"
  },
  {
    value: "和歌山",
    label: "和歌山"
  },
  {
    value: "鳥取",
    label: "鳥取"
  },
  {
    value: "島根",
    label: "島根"
  },
  {
    value: "岡山",
    label: "岡山"
  },
  {
    value: "広島",
    label: "広島"
  },
  {
    value: "山口",
    label: "山口"
  },
  {
    value: "徳島",
    label: "徳島"
  },
  {
    value: "香川",
    label: "香川"
  },
  {
    value: "愛媛",
    label: "愛媛"
  },
  {
    value: "高知",
    label: "高知"
  },
  {
    value: "福岡",
    label: "福岡"
  },
  {
    value: "佐賀",
    label: "佐賀"
  },
  {
    value: "長崎",
    label: "長崎"
  },
  {
    value: "熊本",
    label: "熊本"
  },
  {
    value: "大分",
    label: "大分"
  },
  {
    value: "宮崎",
    label: "宮崎"
  },
  {
    value: "鹿児島",
    label: "鹿児島"
  },
  {
    value: "沖縄",
    label: "沖縄"
  }
];
class PostList extends Component {
  state = {
    open: false,
    body: "",
    place: "",
    errors: {}
  };

  ///新しいprops返す frontからCLEAR_ERRORS
  componentWillReceiveProps(nextProps) {
    if (nextProps.front.errors) {
      this.setState({
        errors: nextProps.front.errors
      });
    }
    if (!nextProps.front.errors && !nextProps.front.loading) {
      this.setState({ body: "", place: "", open: false, errors: {} });
    }
  }

  handleOpen = () => {
    this.setState({ open: true });
  };
  onClose = () => {
    this.props.clearErrors();
    this.setState({ open: false, errors: {} });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const newScream = {
      body: this.state.body,
      place: this.state.place
    };
    console.log(newScream);
    this.props.postList(newScream);
  };
  render() {
    const { errors } = this.state;
    const {
      classes,
      front: { loading }
    } = this.props;
    return (
      <Fragment>
        <OnButton onClick={this.handleOpen} tip="投稿">
          <Create />
        </OnButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
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
          <DialogTitle>新しい投稿</DialogTitle>
          <DialogContent>
            <form onSubmit={this.onSubmit}>
              <TextField
                name="body"
                type="text"
                label=""
                multiline
                rows="3"
                value={this.state.body}
                error={errors.error ? true : false}
                helperText={errors.error}
                className={classes.textField}
                onChange={this.onChange}
                fullWidth
              />
              <TextField
                name="place"
                id="outlined-select-currency"
                select
                label="Select"
                value={this.state.place}
                onChange={this.onChange}
                helperText="場所を選らんでください"
                variant="outlined"
              >
                {prefectures.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submitButton}
                disabled={loading}
              >
                Submit
                {loading && (
                  <CircularProgress
                    size={30}
                    className={classes.progressSpinner}
                  />
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

PostList.propTypes = {
  postList: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  front: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  front: state.front
});

export default connect(
  mapStateToProps,
  { postList, clearErrors }
)(withStyles(styles)(PostList));
