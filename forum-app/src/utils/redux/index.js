import { applyMiddleware, createStore } from "redux";
import { thunk } from "redux-thunk";
import rootReducer from "./rootReducer";
import { loadingBarMiddleware } from "react-redux-loading-bar";

const store = createStore(
    rootReducer, 
    applyMiddleware(thunk, loadingBarMiddleware())
);

export { store };