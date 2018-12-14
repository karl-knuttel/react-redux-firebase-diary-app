import React, { Component } from "react";
import { connect } from "react-redux";
import { editNote } from "../actions/notesActions";

class NoteEdit extends Component {
	constructor(props) {
		super(props);

		this.state = {
			title: this.props.note.title,
			body : this.props.note.body
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	handleSubmit(e) {
		e.preventDefault();

		// Populate the note
		const note = {
			title: this.state.title,
			body : this.state.body,
			uid  : this.props.uid
		};

		// Post this to firebase database
		this.props.editNote(this.props.match.params.id, note);

		// Reset state to empty values
		this.setState({
			title: "",
			body : ""
		});
		this.props.history.push("/");
	}

	render() {
		return (
			<div className="App">
				<div className="container-fluid">
					<div className="row justify-content-center">
						<div className="col-sm-6 mt-4">
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
										Save
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state, ownProps) {
	return {
		note: state.notes[ownProps.match.params.id],
		uid : state.user.uid
	};
}

export default connect(
	mapStateToProps,
	{ editNote }
)(NoteEdit);
