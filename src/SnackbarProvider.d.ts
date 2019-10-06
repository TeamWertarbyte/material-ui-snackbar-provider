import React from 'react'
import { ButtonProps } from '@material-ui/core/Button';
import { SnackbarProps } from '@material-ui/core/Snackbar';

export interface SnackbarProviderProps {
    ButtonProps?: ButtonProps,
    children: React.ReactNode,
    SnackbarProps?: SnackbarProps
}

declare const SnackbarProvider: React.ComponentType<SnackbarProviderProps>
export default SnackbarProvider
