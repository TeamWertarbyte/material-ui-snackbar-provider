/* eslint-env jest */
import React from 'react'
import { mount } from 'enzyme'
import SnackbarProvider from './SnackbarProvider'
import { Snackbar, Button } from '@material-ui/core'
import SnackbarContext from './SnackbarContext'

describe('SnackbarProvider', () => {
  it('adds a snackbar property to the context', () => {
    const { Consumer, snackbar } = snackbarGrabber()
    mount(<SnackbarProvider><Consumer /></SnackbarProvider>)

    expect(snackbar()).toEqual({
      showMessage: expect.any(Function)
    })
  })

  it('does not display a snackbar by default', () => {
    const tree = mount(<SnackbarProvider />)
    expect(tree.find(Snackbar).prop('open')).toBe(false)
  })

  it('shows a snackbar after calling showMessage', () => {
    const { tree, snackbar } = getSnackbarWithContext()

    snackbar.showMessage('Something went wrong')
    tree.update()
    expect(tree.find(Snackbar).prop('open')).toBe(true)
    expect(tree.find(Snackbar).prop('message')).toBe('Something went wrong')
    expect(tree.find(Snackbar).prop('action')).toBeFalsy()
  })

  it('can display an action button', () => {
    const { tree, snackbar } = getSnackbarWithContext()

    snackbar.showMessage('Something went wrong', 'Retry', () => {})
    tree.update()
    expect(tree.find(Snackbar).find(Button).text()).toBe('Retry')
  })

  it('calls the action callback after clicking the button and closes the snackbar', () => {
    const { tree, snackbar } = getSnackbarWithContext()

    const actionCallback = jest.fn()
    snackbar.showMessage('Something went wrong', 'Retry', actionCallback)
    tree.update()

    tree.find(Snackbar).find(Button).simulate('click')
    expect(actionCallback).toHaveBeenCalled()
    tree.update()
    expect(tree.find(Snackbar).prop('open')).toBe(false)
  })

  it('hides the snackbar when its onClose prop is called', () => {
    const { tree, snackbar } = getSnackbarWithContext()

    snackbar.showMessage('Test')
    tree.update()

    tree.find(Snackbar).prop('onClose')()
    tree.update()
    expect(tree.find(Snackbar).prop('open')).toBe(false)
  })

  it('propagates SnackbarProps to the Snackbar component', () => {
    const tree = mount(<SnackbarProvider SnackbarProps={{ autoHideDuration: 6000 }} />)

    expect(tree.find(Snackbar).prop('autoHideDuration')).toBe(6000)
  })

  it('propagates ButtonProps to the action Button component', () => {
    const { tree, snackbar } = getSnackbarWithContext({ ButtonProps: { color: 'primary' } })
    snackbar.showMessage('Internet deleted', 'Undo', () => {})
    tree.update()
    expect(tree.find(Button).prop('color')).toBe('primary')
  })

  it('always returns the same reference', () => {
    const { Consumer, snackbar } = snackbarGrabber()
    const tree = mount(<SnackbarProvider><Consumer /></SnackbarProvider>)
    const firstSnackbar = snackbar()
    tree.instance().forceUpdate()
    expect(snackbar()).toBe(firstSnackbar)
  })
})

function snackbarGrabber () {
  let snackbar = null
  return {
    snackbar: () => snackbar,
    Consumer: () => {
      snackbar = React.useContext(SnackbarContext)
      return null
    }
  }
}

function getSnackbarWithContext (props) {
  const { Consumer, snackbar } = snackbarGrabber()
  const tree = mount(<SnackbarProvider {...props}><Consumer /></SnackbarProvider>)
  return {
    tree, snackbar: snackbar()
  }
}
