import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import pink from '@material-ui/core/colors/pink';

export default createMuiTheme({
	palette: {
		primary: {
			xLight: purple[100],
			light: purple[300],
			main: purple[500],
			dark: purple[700]
		},
		secondary: {
			light: pink[300],
			main: pink[500],
			dark: pink[700]
		}
	},
	typography: {
		useNextVariants: true
	}
});
