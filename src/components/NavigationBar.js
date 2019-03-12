import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

import routs from '../constants/routs';

export class NavigationBar extends Component {
	getLinkClassName(route) {
		const side = route === routs.LOACTIONS ? 'left' : 'right';
		const selected = this.props.location.pathname.includes(route) ? 'selected' : '';
		return `navigation-bar-primary ${side} ${selected}`;
	}

	render() {
		return (
			<div className="flex-row navigation-bar-container">
				<div />
				<Link className="flex-50" to={routs.LOACTIONS}>
					<div className={this.getLinkClassName(routs.LOACTIONS)}>locations</div>
				</Link>
				<Link className="flex-50" to={routs.CATEGORIES}>
					<div className={this.getLinkClassName(routs.CATEGORIES)}>categories</div>
				</Link>
			</div>
		);
	}
}

export default withRouter(NavigationBar);
