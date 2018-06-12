/* eslint-env jest */
import React from 'react'
import { mount, shallow } from 'enzyme'
import SnackbarProvider from './SnackbarProvider'
import { Snackbar, Button } from '@material-ui/core'

describe('SnackbarProvider', () => {
  it('adds a snackbar property to the context', () => {
    const tree = shallow(<SnackbarProvider />)

    const childContext = tree.instance().getChildContext()
    expect(childContext).toEqual({
      snackbar: {
        showMessage: expect.any(Function)
      }
    })
  })

  it('does not display a snackbar by default', () => {
    const tree = mount(<SnackbarProvider />)
    expect(tree.find(Snackbar).prop('open')).toBe(false)
  })

  it('shows a snackbar after calling showMessage', () => {
    const tree = mount(<SnackbarProvider />)

    showMessage(tree, 'Something went wrong')
    tree.update()
    expect(tree.find(Snackbar).prop('open')).toBe(true)
    expect(tree.find(Snackbar).prop('message')).toBe('Something went wrong')
    expect(tree.find(Snackbar).prop('action')).toBeFalsy()
  })

  it('can display an action button', () => {
    const tree = mount(<SnackbarProvider />)

    showMessage(tree, 'Something went wrong', 'Retry', () => {})
    tree.update()
    expect(tree.find(Snackbar).find(Button).text()).toBe('Retry')
  })

  it('calls the action callback after clicking the button and closes the snackbar', () => {
    const tree = mount(<SnackbarProvider />)
    const actionCallback = jest.fn()
    showMessage(tree, 'Something went wrong', 'Retry', actionCallback)
    tree.update()

    tree.find(Snackbar).find(Button).simulate('click')
    expect(actionCallback).toHaveBeenCalled()
    tree.update()
    expect(tree.find(Snackbar).prop('open')).toBe(false)
  })

  it('hides the snackbar when its onClose prop is called', () => {
    const tree = mount(<SnackbarProvider />)
    showMessage(tree, 'Test')
    tree.update()

    tree.find(Snackbar).prop('onClose')()
    tree.update()
    expect(tree.find(Snackbar).prop('open')).toBe(false)
  })

  it('propagates SnackbarProps to the Snackbar component', () => {
    const tree = mount(<SnackbarProvider SnackbarProps={{ autoHideDuration: 6000 }} />)
    expect(tree.find(Snackbar).prop('autoHideDuration')).toBe(6000)
  })
})

function showMessage (snackbarProvider, ...other) {
  snackbarProvider.instance().getChildContext().snackbar.showMessage(...other)
}
