/* eslint-env jest */
import * as index from './'
import SnackbarProvider from './SnackbarProvider'
import withSnackbar from './withSnackbar'

describe('index.js', () => {
  it('exports SnackbarProvider', () => {
    expect(index.SnackbarProvider).toBe(SnackbarProvider)
  })

  it('exports withSnackbar', () => {
    expect(index.withSnackbar).toBe(withSnackbar)
  })
})
