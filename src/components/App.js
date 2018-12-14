import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getNotes, saveNote, deleteNote } from "../actions/notesActions";
import { getUser } from "../actions/userActions";
import NoteCard from "./NoteCard";

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			title: "",
			body : ""
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.renderNotes  = this.renderNotes.bind(this);
	}

	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	handleSubmit(e) {
		e.preventDefault();

		// Create object to send to the database
		const note = {
			title: this.state.title,
			body : this.state.body,
			uid  : this.props.user.uid
		};

		// Post this to firebase database
		this.props.saveNote(note);

		// Reset state to empty values
		this.setState({
			title: "",
			body : ""
		});
	}

	// Render all the notes in the databse
	renderNotes() {
		return _.map(this.props.notes, (note, key) => {
			return (
				<NoteCard key={key}>
					<Link to={`/${key}`}>
						<h2>{note.title}</h2>
					</Link>
					<p>{note.body}</p>
					{note.uid === this.props.user.uid && (
						<div>
							<button
								className = "btn btn-danger btn-xs"
								onClick   = {() => this.props.deleteNote()}
							>
								Delete
							</button>
							<button className="btn btn-warning btn-xs pull-right">
								<Link to={`/${key}/edit`}>Edit</Link>
							</button>
						</div>
					)}
				</NoteCard>
			);
		});
	}

	render() {
		console.log(this.props.user);
		return (
			<div className="App">
				<div className="container-fluid">
					<div className="row justify-content-center">
						<div className="col-sm-2 text-center mt-4">
							<img
								src       = {this.props.user.photoURL}
								alt       = {`Avatar of ${this.props.user.displayName}`}
								height    = "100px"
								className = "img img-responsive circle"
								style     = {{
									padding     : "20",
									borderRadius: "50%"
								}}
							/>
							<h4 className="username mt-3">
								Welcome back {this.props.user.displayName}
							</h4>
						</div>
						<div className="col-sm-10 mt-4">
							<form onSubmit={this.handleSubmit}>
								<div className="form-group">
									<input
										onChange    = {this.handleChange}
										value       = {this.state.title}
										type        = "text"
										name        = "title"
										className   = "form-control no-border"
										placeholder = "Title..."
										required
									/>
								</div>

								<div className="form-group">
									<textarea
										onChange    = {this.handleChange}
										value       = {this.state.body}
										type        = "text"
										name        = "body"
										className   = "form-control no-border"
										placeholder = "Body..."
										required
									/>
								</div>

								<div className="form-group">
									<button className="btn btn-primary col-sm-12">
										Post
									</button>
								</div>
							</form>

							{this.renderNotes()}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		notes: state.notes,
		user : state.user
	};
};

export default connect(
	mapStateToProps,
	{ getNotes, saveNote, deleteNote, getUser }
)(App);
