import React from 'react'
import PropTypes from 'prop-types'

/**
 * Creates a HOC that will inject the snackbar prop into the wrapped
 * component.
 */
export default function withSnackbar () {
  return (Component) => {
    const ComponentWithSnackbar = (props, { snackbar }) => (
      <Component
        snackbar={snackbar}
        {...props}
      />
    )

    ComponentWithSnackbar.contextTypes = {
      snackbar: PropTypes.object.isRequired
    }

    return ComponentWithSnackbar
  }
}
