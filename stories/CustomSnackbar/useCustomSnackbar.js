import React from 'react'
import { useSnackbar } from '../../src'

export default function useCustomSnackbar () {
  const snackbar = useSnackbar()
  return React.useMemo(() => {
    const showMessage = type => (
      message,
      action,
      handleAction,
      customParameters
    ) =>
      snackbar.showMessage(message, action, handleAction, {
        ...customParameters,
        type
      })
    return {
      ...snackbar,
      showMessage: showMessage('info'),
      showInfo: showMessage('info'),
      showWarning: showMessage('warning'),
      showError: showMessage('error'),
      showSuccess: showMessage('success')
    }
  }, [snackbar])
}
