import React from 'react'
import { ButtonProps } from '@mui/material/Button';
import { SnackbarProps } from '@mui/material/Snackbar';

export interface SnackbarProviderProps {
    ButtonProps?: Partial<ButtonProps>,
    children: React.ReactNode,
    SnackbarComponent?: React.ComponentType<{
        message?: string;
        action?: string;
        ButtonProps?: Partial<ButtonProps>;
        SnackbarProps: Partial<SnackbarProps>;
        customParameters: { autoHideDuration?: number };
    }>,
    SnackbarProps?: Partial<SnackbarProps>
}

declare const SnackbarProvider: React.ComponentType<SnackbarProviderProps>
export default SnackbarProvider
