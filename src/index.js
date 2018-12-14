import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import Login from "./components/Login";
import Header from "./routes/Header";
import LoadingComponent from "./components/LoadingComponent";
import AuthenticationComponent from "./components/AuthenticationComponent";
import NoteDetail from "./components/NoteDetail";
import NoteEdit from "./components/NoteEdit";

// Redux
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

//Router
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

// Reducer
import rootReducer from "./reducers/rootReducer";

// Create store -> reducers -> 'actions - actionType' | applyMiddelware()
const store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(thunk))
);

// Provide the store to React
ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<LoadingComponent>
				<div>
					<Switch>
						<Route path="/login" component={Login} exact={true} />
						<Redirect from="/logout" to="/login" />
						<AuthenticationComponent>
							<Header />
							<Route
								path      = "/:id/edit"
								component = {NoteEdit}
								exact     = {true}
							/>
							<Route
								path      = "/:id"
								component = {NoteDetail}
								exact     = {true}
							/>
							<Route path="/" component={App} exact={true} />
						</AuthenticationComponent>
					</Switch>
				</div>
			</LoadingComponent>
		</BrowserRouter>
	</Provider>,
	document.getElementById("root")
);
