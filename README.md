# Material-UI Snackbar Provider
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Build Status](https://travis-ci.org/TeamWertarbyte/material-ui-snackbar-provider.svg)](https://travis-ci.org/TeamWertarbyte/material-ui-snackbar-provider)
[![Coverage Status](https://coveralls.io/repos/github/TeamWertarbyte/material-ui-snackbar-provider/badge.svg?branch=master)](https://coveralls.io/github/TeamWertarbyte/material-ui-snackbar-provider?branch=master)

A convenient way to use [material-ui][]'s snackbars.

## Installation
```shell
npm i --save material-ui-snackbar-provider
```

## Usage
Simply wrap all components that should display snackbars with the `SnackbarProvider` component,
e.g. by wrapping your router with it.

```js
import { SnackbarProvider } from 'material-ui-snackbar-provider'

// somewhere at the root of your app
<SnackbarProvider SnackbarProps={{ autoHideDuration: 4000 }}>
  {/* the rest of your app belongs here, e.g. the router */}
</SnackbarProvider>
```

You can then display messages with the `useSnackbar` hook. More examples [can be found here](https://github.com/TeamWertarbyte/material-ui-snackbar-provider/tree/master/stories).

```js
import { useSnackbar } from 'material-ui-snackbar-provider'

export default function MyComponent (props) {
  const snackbar = useSnackbar()

  const handleSomething = () => {
    snackbar.showMessage(
      'Something happened!',
      'Undo', () => handleUndo()
    )
  }

  const handleUndo = () => {
    // *snip*
  }

  return (
    // *snip*
  )
}
```

If you're not using React ^16.8.0 and our you can't use hooks (e.g. in a class component), you can use the `withSnackbar` HOC and the injected `snackbar` prop instead.

```js
import { withSnackbar } from 'material-ui-snackbar-provider'

class MyComponent {
  // *snip*

  handleSomething () {
    this.props.snackbar.showMessage(
      'Something happened!',
      'Undo', () => this.handleUndo())
  }

  handleUndo () {
    // *snip*
  }
}

export default withSnackbar()(MyComponent) // export the wrapped component
```

### Snackbar variants
Snackbar variants (i.e. diffent styles for different types of messages) can be implemented using the `Alert` component from `@material-ui/lab`. An example that also adds a custom hook to display snackbars with different severities is available [here](https://github.com/TeamWertarbyte/material-ui-snackbar-provider/tree/master/stories/1-custom.stories.js).

### SnackbarProvider Props
|Name            |Type        |Default     |Description
|----------------|------------|------------|--------------------------------
|ButtonProps|`object`||Props to pass through to the action [button][mui-button].
|children|`node`||The children that are wrapped by this provider.
|SnackbarComponent|`ReactElement`||Custom snackbar component.
|SnackbarProps|`object`||Props to pass through to the [snackbar][mui-snackbar].

\* required property

[mui-button]: https://material-ui.com/api/button/
[mui-snackbar]: https://material-ui.com/api/snackbar/

### Snackbar methods
`snackbar.showMessage(message, [action, handler, customParameters, closeWithoutActionHandler])`
* `message` (string) – message to display
* `action` (string, _optional_) – label for the action button
* `handler` (function, _optional_) – click handler for the action button
* `customParameters` (any, _optional_) - custom parameters that will be passed to the snackbar renderer
* `closeWithoutActionHandler` (function, _optional_) - function that is called when the snackbar hides and the action button was not clicked

## Concerns
> Dude, this is not pretty React-like, I don't want to call a function to do something that changes the UI! I want to display a snackbar based on the state only, e.g. by using Redux.

I agree. And if it wouldn't be an absolute pain to do that if you intend to display more than one snackbar, this package wouldn't even exist. The thing is that most of the time, snackbars are displayed when state _changes_ and not really depend on the _state_ itself.

Also, calling a method after dispatching the action is pretty convenient, especially when using something like [redux-thunk][]:

```js
deleteEmail (id) {
  this.props.dispatch(someReduxThunkAction())
  .then(() => {
    this.snackbar.showMessage(
      'E-mail deleted',
      'Undo', () => this.restoreEmail(id))
  })
  .catch((e) => {
    this.snackbar.showMessage(
      'E-mail could not be deleted',
      'Retry', () => this.deleteEmail(id))
  })
}
```

So this package makes snackbars a lot easier to use, which is all it's intended to do.

[material-ui]: https://material-ui.com/
[redux-thunk]: https://github.com/gaearon/redux-thunk

## License

The files included in this repository are licensed under the MIT license.
