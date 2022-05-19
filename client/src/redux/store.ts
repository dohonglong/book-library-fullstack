import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import authReducer from "./auth/reducer";

const rootReducer = combineReducers({ auth: authReducer });

const storeFactory = () => {
  const store = createStore(
    rootReducer,

    composeWithDevTools(applyMiddleware(thunk))
  );

  return store;
};

export default storeFactory;

/* 

const rootReducer = combineReducers({ auth: authReducer })
export type AppState = ReturnType<typeof rootReducer>

const initialState: AppState = {
  auth: {
    isAuthenticated: false,
    user: null,
  },
}

const storeFactory = () => {
  const hasAccessToken = localStorage.getItem('access_token')
  if (hasAccessToken) {
    initialState.auth.isAuthenticated = true
  }

  const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunk))
  )

  return store
}

const store = storeFactory()
export default store

*/
