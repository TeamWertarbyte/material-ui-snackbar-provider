/* eslint-env jest */
import React from 'react'
import { mount } from 'enzyme'
import withSnackbar from './withSnackbar'
import SnackbarContext from './SnackbarContext';

describe('withSnackbar', () => {
  it('adds a snackbar prop', () => {
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

    const Component = () => {
      return <div />
    }
    const ComponentWithSnackbar = withSnackbar()(Component)

    const tree = mount(
      <DummySnackbarProvider>
        <ComponentWithSnackbar />
      </DummySnackbarProvider>
    ).find(Component)

    expect(tree.prop('snackbar')).toBe(dummySnackbarContext)
  })
})
