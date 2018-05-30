import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './Payments';

class Header extends Component {
	renderContent() {
		switch (this.props.auth) {
			case null:
				return;
			case false:
				return [
					<li key="1">
						<a href="/oauth/google">Google</a>
					</li>,
					<li key="2">
						<a href="/oauth/twitter">Twitter</a>
					</li>,
					<li key="3">
						<a href="/oauth/linkedin">LinkedIn</a>
					</li>
				];
			default:
				return [
					<li key="1">
						<Payments />
					</li>,
					<li key="2" style={{ margin: '0 10px' }}>
						Credits: {this.props.auth.credits}
					</li>,
					<li key="3">
						<a href="/api/logout">Logout</a>
					</li>
				];
		}
	}

	render() {
		return (
			<nav className="cyan darken-2">
				<div className="nav-wrapper">
					<Link
						to={this.props.auth ? '/surveys' : '/'}
						className="left brand-logo"
					>
						Spamalot
					</Link>
					<ul className="right">{this.renderContent()}</ul>
				</div>
			</nav>
		);
	}
}

function mapStateToProps({ auth }) {
	return { auth };
}

export default connect(mapStateToProps)(Header);
