import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import projectReducer from './reducers/projects-reducer';

let mStore;

const initialState = {};
const history = createBrowserHistory();

const rootReducer = combineReducers({
  router: connectRouter(history),
  project: projectReducer,
});

export const createNewStore = state =>
  createStore(
    rootReducer,
    state,
    composeWithDevTools(applyMiddleware(routerMiddleware(history), thunkMiddleware)),
  );

const initialStore = (state = initialState) => {
  if (!mStore) {
    mStore = createNewStore(state);
  }

  return mStore;
};

const store = initialStore();

export default store;
