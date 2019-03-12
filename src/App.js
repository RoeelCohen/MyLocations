import React, { Fragment } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';

import './app.scss';

import theme from './style/materialTheme';
import routs from './constants/routs.js';
import Categories from './containers/pages/Categories';
import Locations from './containers/pages/Locations';
import Header from './components/Header';
import AddCategory from './containers/pages/AddCategory';
import AddLocation from './containers/pages/AddLocation';
import EditLocation from './containers/pages/EditLocation';
import EditCategory from './containers/pages/EditCategory';
import WatchData from './containers/pages/WatchData';
import LocationOnMap from './containers/pages/LocationOnMap';

const App = () => {
	return (
		<MuiThemeProvider theme={theme}>
			<BrowserRouter>
				<Fragment>
					<Header />
					<Switch>
						<Redirect exact from={routs.HOME} to={routs.LOACTIONS} />
						<Route exact path={routs.LOACTIONS} component={Locations} />
						<Route exact path={routs.CATEGORIES} component={Categories} />
						<Route exact path={routs.ADD_CATEGORY} component={AddCategory} />
						<Route exact path={routs.ADD_LOCATION} component={AddLocation} />
						<Route exact path={routs.EDIT_LOCATION} component={EditLocation} />
						<Route exact path={routs.EDIT_CATEGORY} component={EditCategory} />
						<Route exact path={routs.WATCH_DATA} component={WatchData} />
						<Route exact path={routs.WATCH_LOCATION_IN_MAP} component={LocationOnMap} />
					</Switch>
				</Fragment>
			</BrowserRouter>
		</MuiThemeProvider>
	);
};

export default App;
