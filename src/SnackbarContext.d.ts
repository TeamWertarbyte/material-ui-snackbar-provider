export interface SnackbarProviderValue {
  /**
   * Display a message with this snackbar.
   * @param {string} message message to display
   * @param {string} [action] label for the action button
   * @param {function} [handleAction] click handler for the action button
   */
  showMessage(message: string, action?: string, handleAction?: () => void)
}

declare const SnackbarContext: React.Context<SnackbarProviderValue>
export default SnackbarContext
