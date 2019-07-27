import React from 'react'
import SnackbarContext from './SnackbarContext'

/**
 * Creates a HOC that will inject the snackbar prop into the wrapped
 * component.
 */
export default function withSnackbar () {
  return (Component) => (props) => (
    <SnackbarContext.Consumer>
      {snackbar => <Component snackbar={snackbar} {...props} />}
    </SnackbarContext.Consumer>
  )
}
