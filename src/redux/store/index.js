import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "redux/reducers";
import { TOKEN_NAME } from "redux/constants";
import setAuthorizationHeader from "utils/setAuthorizationHeader";
import { userLoggedIn } from "redux/actions/auth";

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

if (localStorage[TOKEN_NAME]) {
  var tokenInfo = JSON.parse(localStorage[TOKEN_NAME]);
  setAuthorizationHeader(tokenInfo.token);
  store.dispatch(userLoggedIn(tokenInfo));
}

export default store;
