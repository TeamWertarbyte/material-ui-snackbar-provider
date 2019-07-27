import React from 'react'
import SnackbarContext from './SnackbarContext'

export default function useSnackbar () {
  return React.useContext(SnackbarContext)
}
