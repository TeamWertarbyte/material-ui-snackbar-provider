import { SnackbarProviderValue } from "./SnackbarContext";

export interface WithSnackbarProps {
    snackbar: SnackbarProviderValue
}

export interface WithSnackbar extends React.Component<P & WithSnackbarProps> {}

declare const withSnackbar: () => (component: React.Component<P>) => WithSnackbar<P>
export default withSnackbar
