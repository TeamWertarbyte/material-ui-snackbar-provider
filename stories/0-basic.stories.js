import React from "react";
import { SnackbarProvider, useSnackbar } from "../src";
import { Button } from "@material-ui/core";

export default {
  title: "SnackbarProvider"
};

export const basicUsage = () => {
  function InnerComponent() {
    const snackbar = useSnackbar();
    const handleShowSnackbar = React.useCallback(() => {
      snackbar.showMessage("This is a snackbar.");
    }, [snackbar]);

    return <Button onClick={handleShowSnackbar}>Show snackbar</Button>;
  }

  return (
    <SnackbarProvider>
      <InnerComponent />
    </SnackbarProvider>
  );
};

export const withUndoButton = () => {
  function InnerComponent() {
    const snackbar = useSnackbar();
    const handleShowSnackbar = React.useCallback(() => {
      snackbar.showMessage("Something happened.", "Undo", () => {
        snackbar.showMessage("Undo successful.");
      });
    }, [snackbar]);

    return <Button onClick={handleShowSnackbar}>Show snackbar</Button>;
  }

  return (
    <SnackbarProvider>
      <InnerComponent />
    </SnackbarProvider>
  );
};
