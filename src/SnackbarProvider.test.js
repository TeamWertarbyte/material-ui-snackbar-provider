/* eslint-env jest */
import React from 'react'
import { mount } from 'enzyme'
import SnackbarProvider from './SnackbarProvider'
import { Snackbar, Button } from '@material-ui/core'
import SnackbarContext from './SnackbarContext'

describe('SnackbarProvider', () => {
  it('adds a snackbar property to the context', () => {
    const { Consumer, snackbar } = snackbarGrabber()
    mount(
      <SnackbarProvider>
        <Consumer />
      </SnackbarProvider>
    )

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
    expect(
      tree
        .find(Snackbar)
        .find(Button)
        .text()
    ).toBe('Retry')
  })

  it('calls the action callback after clicking the button and closes the snackbar', () => {
    const { tree, snackbar } = getSnackbarWithContext()

    const actionCallback = jest.fn()
    snackbar.showMessage('Something went wrong', 'Retry', actionCallback)
    tree.update()

    tree
      .find(Snackbar)
      .find(Button)
      .simulate('click')
    expect(actionCallback).toHaveBeenCalled()
    tree.update()
    expect(tree.find(Snackbar).prop('open')).toBe(false)
  })

  it('calls the close callback after closing the snackbar', () => {
    const { tree, snackbar } = getSnackbarWithContext()

    const actionCallback = jest.fn()
    const closeCallback = jest.fn()
    snackbar.showMessage('Something went wrong', 'Retry', actionCallback, undefined, closeCallback)
    tree.update()

    tree.find(Snackbar).prop('onClose')()
    tree.update()
    expect(actionCallback).not.toHaveBeenCalled()
    expect(closeCallback).toHaveBeenCalled()
    tree.update()
    expect(tree.find(Snackbar).prop('open')).toBe(false)
  })

  it('does not call the close callback after clicking the button', () => {
    const { tree, snackbar } = getSnackbarWithContext()

    const actionCallback = jest.fn()
    const closeCallback = jest.fn()
    snackbar.showMessage('Something went wrong', 'Retry', actionCallback, undefined, closeCallback)
    tree.update()

    tree
      .find(Snackbar)
      .find(Button)
      .simulate('click')
    expect(actionCallback).toHaveBeenCalled()
    expect(closeCallback).not.toHaveBeenCalled()
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
    const tree = mount(
      <SnackbarProvider SnackbarProps={{ autoHideDuration: 6000 }} />
    )

    expect(tree.find(Snackbar).prop('autoHideDuration')).toBe(6000)
  })

  it('propagates ButtonProps to the action Button component', () => {
    const { tree, snackbar } = getSnackbarWithContext({
      ButtonProps: { color: 'primary' }
    })
    snackbar.showMessage('Internet deleted', 'Undo', () => {})
    tree.update()
    expect(tree.find(Button).prop('color')).toBe('primary')
  })

  it('can overwrite the auto hide duration when showing a snackbar', () => {
    const { tree, snackbar } = getSnackbarWithContext({ SnackbarProps: { autoHideDuration: 6000 } })
    snackbar.showMessage('Internet deleted', 'Undo', () => {}, { autoHideDuration: 42000 })
    tree.update()

    expect(tree.find(Snackbar).prop('autoHideDuration')).toBe(42000)
  })

  it('always returns the same reference', () => {
    const { Consumer, snackbar } = snackbarGrabber()
    const tree = mount(
      <SnackbarProvider>
        <Consumer />
      </SnackbarProvider>
    )
    const firstSnackbar = snackbar()
    tree.instance().forceUpdate()
    expect(snackbar()).toBe(firstSnackbar)
  })

  it('supports custom snackbar renderers', () => {
    const SnackbarComponent = jest.fn(({ message, action, ButtonProps, SnackbarProps }) => (
      <Snackbar {...SnackbarProps} message={message || ''} action={action != null && <Button {...ButtonProps}>{action}</Button>} />
    ))
    const { tree, snackbar } = getSnackbarWithContext({ SnackbarComponent })
    tree.update()

    const handleAction = jest.fn()
    snackbar.showMessage('Test', 'Action', handleAction, { type: 'error' })
    tree.update()
    expect(SnackbarComponent).toHaveBeenCalledWith(expect.objectContaining({
      message: 'Test',
      customParameters: { type: 'error' },
      SnackbarProps: expect.anything()
    }), expect.anything())
    expect(tree.find(Snackbar).prop('open')).toBe(true)
    expect(tree.find(Snackbar).prop('message')).toBe('Test')

    tree
      .find(Snackbar)
      .find(Button)
      .simulate('click')
    expect(handleAction).toHaveBeenCalledTimes(1)

    tree.find(Snackbar).prop('onClose')()
    tree.update()
    expect(tree.find(Snackbar).prop('open')).toBe(false)
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
  const tree = mount(
    <SnackbarProvider {...props}>
      <Consumer />
    </SnackbarProvider>
  )
  return {
    tree,
    snackbar: snackbar()
  }
}
