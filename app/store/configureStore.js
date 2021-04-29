// import { createBrowserHistory } from "history";
import { applyMiddleware, createStore, compose } from "redux";
import { routerMiddleware } from "react-router-redux";
import rootReducer from "../reducers";

// export const history = createBrowserHistory();
// const middleware = routerMiddleware(history);

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    // composeEnhancers(applyMiddleware(middleware)),
  );
}
