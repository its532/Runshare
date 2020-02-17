import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { uploadPost } from "../redux/actions/PostActions";

export class Upload extends Component {
  handleImageChange = e => {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append("image", image, image.name);
    this.props.uploadPost(this.props.screamId, formData);
  };
  handleEditPicture = () => {
    // console.log(this.props.list.screamId);
    const fileInput = document.getElementById("imagePost");
    console.log(this.fileInput);
    fileInput.click();
  };
  render() {
    return (
      <Fragment>
        <input type="file" id="imagePost" onChange={this.handleImageChange} />
      </Fragment>
    );
  }
}

Upload.propTypes = {
  uploadPost: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  screamId: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

const mapActionsToProps = {
  uploadPost
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(Upload);
