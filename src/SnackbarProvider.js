import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Snackbar from '@mui/material/Snackbar'
import Button from '@mui/material/Button'
import SnackbarContext from './SnackbarContext'

function DefaultSnackbar ({
  message, action, ButtonProps, SnackbarProps, customParameters
}) {
  return (
    <Snackbar
      {...SnackbarProps}
      message={message || ''}
      action={action != null && (
        <Button
          color='secondary'
          size='small'
          {...ButtonProps}
        >
          {action}
        </Button>
      )}
    />
  )
}

export default class SnackbarProvider extends PureComponent {
  state = {
    message: null,
    open: false
  }

  constructor (props) {
    super(props)
    this.contextValue = {
      showMessage: this.showMessage
    }
  }

  /**
   * Display a message with this snackbar.
   * @param {string} message message to display
   * @param {string} [action] label for the action button
   * @param {function} [handleAction] click handler for the action button
   * @param {any} [customParameters] custom parameters that will be passed to the snackbar renderer
   * @param {function} [handleHideWithoutAction] handler function that is called when the snackbar hides and the action button was not clicked
   * @public
   */
  showMessage = (message, action, handleAction, customParameters, handleHideWithoutAction) => {
    this.setState({ open: true, message, action, handleAction, customParameters, handleHideWithoutAction })
  }

  handleActionClick = () => {
    this.setState({ open: false, handleAction: null, handleHideWithoutAction: null })
    this.state.handleAction()
  }

  handleHideWithoutAction = () => {
    const handleHideWithoutAction = this.state.handleHideWithoutAction
    this.setState({ open: false, handleAction: null, handleHideWithoutAction: null })
    if (handleHideWithoutAction) {
      handleHideWithoutAction()
    }
  }

  render () {
    const {
      action,
      message,
      open,
      customParameters
    } = this.state

    const {
      ButtonProps = {},
      children,
      SnackbarProps = {},
      SnackbarComponent = DefaultSnackbar
    } = this.props

    return (
      <>
        <SnackbarContext.Provider
          value={this.contextValue}
        >
          {children}
        </SnackbarContext.Provider>
        <SnackbarComponent
          message={message}
          action={action}
          ButtonProps={{ ...ButtonProps, onClick: this.handleActionClick }}
          SnackbarProps={{
            ...SnackbarProps,
            open,
            onClose: this.handleHideWithoutAction,
            autoHideDuration: customParameters && 'autoHideDuration' in customParameters
              ? customParameters.autoHideDuration
              : SnackbarProps.autoHideDuration
          }}
          customParameters={customParameters}
        />
      </>
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
   * Custom snackbar component.
   * Props: open, message, action, ButtonProps, SnackbarProps
   */
  SnackbarComponent: PropTypes.elementType,
  /**
   * Props to pass through to the snackbar.
   */
  SnackbarProps: PropTypes.object
}
