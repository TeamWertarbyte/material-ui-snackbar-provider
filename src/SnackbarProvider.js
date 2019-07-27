import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Snackbar from '@material-ui/core/Snackbar'
import Button from '@material-ui/core/Button'
import SnackbarContext from './SnackbarContext'

export default class SnackbarProvider extends PureComponent {
  state = {
    message: null,
    open: false
  }

  /**
   * Display a message with this snackbar.
   * @param {string} message message to display
   * @param {string} [action] label for the action button
   * @param {function} [handleAction] click handler for the action button
   * @public
   */
  showMessage = (message, action, handleAction) => {
    this.setState({ open: true, message, action, handleAction })
  }

  handleActionClick = () => {
    this.handleClose()
    this.state.handleAction()
  }

  handleClose = () => {
    this.setState({ open: false, handleAction: null })
  }

  render () {
    const {
      action,
      message,
      open
    } = this.state

    const {
      ButtonProps = {},
      children,
      SnackbarProps = {}
    } = this.props

    return (
      <React.Fragment>
        <SnackbarContext.Provider
          value={{
            showMessage: this.showMessage
          }}
        >
          {children}
        </SnackbarContext.Provider>
        <Snackbar
          {...SnackbarProps}
          open={open}
          message={message || ''}
          action={action != null && (
            <Button
              color='secondary'
              size='small'
              {...ButtonProps}
              onClick={this.handleActionClick}
            >
              {action}
            </Button>
          )}
          onClose={this.handleClose}
        />
      </React.Fragment>
    )
  }
}

SnackbarProvider.propTypes = {
  /**
   * Props to pass through to the action button.
   */
  ButtonProps: PropTypes.object,
  /**
   * The children that are wrapped by this provider.
   */
  children: PropTypes.node,
  /**
   * Props to pass through to the snackbar.
   */
  SnackbarProps: PropTypes.object
}
