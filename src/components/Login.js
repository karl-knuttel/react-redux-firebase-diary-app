import React, { Component } from 'react';

import { connect } from 'react-redux';
import { googleLogin, facebookLogin } from '../actions/userActions';

class Login extends Component {

    componentWillMount() {
        if (this.props.user !== null) {
            this.props.history.push('/');
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.user !== null) {
            nextProps.history.push('/');
        }
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row text-center">
                    <div className="col-sm-12 jumbotron">
                        <h1>DIARY | {new Date().getFullYear()}</h1>
                        <h3><i>Log in with your favourite <b>Social Network</b></i></h3>
                    </div>

                    <div className="col-sm-6">
                        <button className="btn btn-danger btn-lg" onClick={this.props.googleLogin}>Login with Google</button>
                    </div>

                    <div className="col-sm-6">
                        <button className="btn btn-primary btn-lg" onClick={this.props.facebookLogin}>Login with Facebook</button>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
        user: state.user
    };
}

export default connect(mapStateToProps, {googleLogin, facebookLogin})(Login);