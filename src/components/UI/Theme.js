import { createMuiTheme } from '@material-ui/core/styles';

const earthRed = '#c9340a';
const charcoalBlack = '#36454F';

export default createMuiTheme({
  palette: {
    common: {
      earthRed: earthRed,
      charcoalBlack: charcoalBlack
    },
    primary: {
      main: earthRed,
    },
    secondary: {
      main: charcoalBlack,
    },
  },
  typography: {
    tab: {
      textTransform: 'none',
      fontWeight: 700,
      fontSize: '1rem',
    },
  },
  mixins: {
    gutters: 0
  }
});