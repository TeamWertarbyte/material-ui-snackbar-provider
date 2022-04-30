export interface SnackbarProviderValue {
  /**
   * Display a message with this snackbar.
   * @param {string} message message to display
   * @param {string} [action] label for the action button
   * @param {function} [handleAction] click handler for the action button
   * @param {any} [customParameters] custom parameters that will be passed to the snackbar renderer
   * @param {function} [handleHideWithoutAction] handler function that is called when the snackbar hides and the action button was not clicked
   */
  showMessage(message: string, action?: string, handleAction?: () => void, customParameters?: { autoHideDuration?: number }, handleHideWithoutAction?: () => void)
}

declare const SnackbarContext: React.Context<SnackbarProviderValue>
export default SnackbarContext
