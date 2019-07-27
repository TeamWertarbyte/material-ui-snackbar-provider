/* eslint-env jest */
import React from 'react'
import { mount } from 'enzyme'
import SnackbarContext from './SnackbarContext'
import useSnackbar from './useSnackbar'

describe('useSnackbar', () => {
  it('injects the snackbar object', () => {
    const dummySnackbarContext = {
      showMessage: () => {}
    }

    function DummySnackbarProvider ({ children }) {
      return (
        <SnackbarContext.Provider value={dummySnackbarContext}>
          {children}
        </SnackbarContext.Provider>
      )
    }

    let snackbar
    const Component = function () {
      snackbar = useSnackbar()
      return null
    }

    mount(
      <DummySnackbarProvider>
        <Component />
      </DummySnackbarProvider>
    ).find(Component)

    expect(snackbar).toBe(dummySnackbarContext)
  })
})
