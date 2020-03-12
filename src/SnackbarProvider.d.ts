import React from 'react'
import { ButtonProps } from '@material-ui/core/Button';
import { SnackbarProps } from '@material-ui/core/Snackbar';

export interface SnackbarProviderProps {
    ButtonProps?: Partial<ButtonProps>,
    children: React.ReactNode,
    SnackbarComponent?: React.ComponentType<{
        message?: string;
        action?: string;
        ButtonProps?: Partial<ButtonProps>;
        SnackbarProps: Partial<SnackbarProps>;
        customParameters: any;
    }>,
    SnackbarProps?: Partial<SnackbarProps>
}

declare const SnackbarProvider: React.ComponentType<SnackbarProviderProps>
export default SnackbarProvider
