import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Snackbar from "material-ui/Snackbar";
import Button from "material-ui/Button";
import IconButton from "material-ui/IconButton";
import CloseIcon from "@material-ui/icons/Close";

export default class SnackbarProvider extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      open: false,
      showCloseButton: false
    };
  }

  getChildContext() {
    return {
      snackbar: {
        showMessage: this.showMessage
      }
    };
  }

  /**
   * Display a message with this snackbar.
   * @param {string} message message to display
   * @param {string} [action] label for the action button
   * @param {function} [handleAction] click handler for the action button
   * @public
   */
  showMessage = (message, action, handleAction, showCloseButton) => {
    this.setState({
      open: true,
      message,
      action,
      handleAction,
      showCloseButton
    });
  };

  handleActionClick = () => {
    this.handleClose();
    this.state.handleAction();
  };

  handleClose = () => {
    this.setState({ open: false, handleAction: null });
  };

  render() {
    const { action, message, open, showCloseButton } = this.state;

    const { children, snackbarProps = {}, style = {} } = this.props;

    let actions = [];
    if (action != null)
      actions.push(
        <Button
          key="button"
          color="secondary"
          size="small"
          onClick={this.handleActionClick}
        >
          {" "}
          {action}
        </Button>
      );
    if (showCloseButton)
      actions.push(
        <IconButton
          style={{ width: "32px", height: "32px" }}
          key="close"
          aria-label="Close"
          color="inherit"
          onClick={this.handleClose}
        >
          <CloseIcon />
        </IconButton>
      );

    return (
      <div style={{ width: "inherit", height: "inherit", ...style }}>
        {children}
        <Snackbar
          {...snackbarProps}
          open={open}
          message={message || ""}
          action={actions}
          onClose={this.handleClose}
        />
      </div>
    );
  }
}

SnackbarProvider.childContextTypes = {
  snackbar: PropTypes.shape({
    showMessage: PropTypes.func
  })
};

SnackbarProvider.propTypes = {
  /**
   * The children that are wrapped by this provider.
   */
  children: PropTypes.node,
  /**
   * Props to pass through to the snackbar.
   */
  SnackbarProps: PropTypes.object,
  /**
   * Override the inline-styles of the root element.
   */
  style: PropTypes.object
};
