import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getUser, logout } from "../actions/userActions";

class Header extends Component {
	render() {
		return (
			<nav className="navbar navbar-expand-lg navbar-light bg-light">
				<button
					className     = "navbar-toggler"
					type          = "button"
					data-toggle   = "collapse"
					data-target   = "#navbarNavAltMarkup"
					aria-controls = "navbarNavAltMarkup"
					aria-expanded = "false"
					aria-label    = "Toggle navigation"
				>
					<span className="navbar-toggler-icon" />
				</button>

				<Link className="navbar-brand" to="/">
					DIARY 2018
				</Link>

				<div
					className = "collapse navbar-collapse"
					id        = "navbarNavAltMarkup"
				>
					<ul className="navbar-nav ml-auto">
						{this.props.user === null ? (
							<li>
								<Link className="nav-item nav-link" to="/login">
									Login
								</Link>
							</li>
						) : (
							<li>
								<Link
									className = "nav-item nav-link"
									to        = "/logout"
									onClick   = {() => this.props.logout()}
								>
									Logout
								</Link>
							</li>
						)}
					</ul>
				</div>
			</nav>
		);
	}
}

function mapStateToProps(state, ownProps) {
	return {
		user: state.user
	};
}

export default connect(
	mapStateToProps,
	{ getUser, logout }
)(Header);
