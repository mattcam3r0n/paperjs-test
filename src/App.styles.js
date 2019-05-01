import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
  // to remove variant warnings
  typography: {
    useNextVariants: true,
  },
  palette: {
    type: 'light',
  },
  overrides: {
    root: {
      display: 'flex',
      // MuiListItemIcon: {
      //   marginRight: 8,
      //   color: 'red'
      // }
    },
  },
});

export const styles = (theme) => ({
  root: {
    flexGrow: 1,
    height: '100vh',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    marginTop: 64,
    padding: 0, // theme.spacing.unit * 3,
    minWidth: 0, // So the Typography noWrap works
  },
});
