import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Snackbar from 'material-ui/Snackbar'

export default class SnackbarProvider extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      message: null,
      open: false
    }
  }

  getChildContext () {
    return {
      snackbar: {
        showMessage: this.showMessage.bind(this)
      }
    }
  }

  /**
   * Display a message with this snackbar.
   * @param {string} message message to display
   * @param {string} [action] label for the action button
   * @param {function} [handleAction] click handler for the action button
   */
  showMessage (message, action, handleAction) {
    this.setState({ open: true, message, action, handleAction })
  }

  handleActionClick = () => {
    this.handleRequestClose()
    this.state.handleAction()
  }

  handleRequestClose = () => {
    this.setState({ open: false, handleAction: null })
  }

  render () {
    const {
      action,
      message,
      open
    } = this.state

    const {
      children,
      snackbarProps = {},
      style = {}
    } = this.props

    return (
      <div style={{ width: 'inherit', height: 'inherit', ...style }}>
        {children}
        <Snackbar
          {...snackbarProps}
          open={open}
          message={message || ''}
          action={action}
          onActionClick={this.handleActionClick}
          onRequestClose={this.handleRequestClose}
        />
      </div>
    )
  }
}

SnackbarProvider.childContextTypes = {
  snackbar: PropTypes.shape({
    showMessage: PropTypes.func
  })
}

SnackbarProvider.propTypes = {
  /**
   * The children that are wrapped by this provider.
   */
  children: PropTypes.node,
  /**
   * Props to pass through to the snackbar.
   */
  snackbarProps: PropTypes.object,
  /**
   * Override the inline-styles of the root element.
   */
  style: PropTypes.object
}
