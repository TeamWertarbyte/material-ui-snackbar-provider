/* eslint-env jest */
import React from 'react'
import PropTypes from 'prop-types'
import { mount } from 'enzyme'
import withSnackbar from './withSnackbar'

describe('withSnackbar', () => {
  it('adds a snackbar prop', () => {
    const dummyContext = {
      snackbar: {}
    }

    class DummySnackbarProvider extends React.Component {
      getChildContext () {
        return dummyContext
      }

      render () {
        return <div {...this.props} />
      }
    }

    DummySnackbarProvider.childContextTypes = {
      snackbar: PropTypes.any
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

    expect(tree.prop('snackbar')).toBe(dummyContext.snackbar)
  })
})
