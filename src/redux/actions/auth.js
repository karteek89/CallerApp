import { USER_LOGGED_IN, USER_LOGGED_OUT, TOKEN_NAME } from "redux/constants";
import { AccountService } from "api";
import { SetAuthorizationHeader } from "utils";

export const userLoggedIn = user => ({
  type: USER_LOGGED_IN,
  user
});

export const userLoggedOut = () => ({
  type: USER_LOGGED_OUT
});

export const setLoginDetails = user => dispatch => {
  localStorage[TOKEN_NAME] = JSON.stringify(user);
  SetAuthorizationHeader(user.token);
  dispatch(userLoggedIn(user));
};

export const login = credentials => dispatch =>
  AccountService.login(credentials).then(user => {
    localStorage[TOKEN_NAME] = JSON.stringify(user);
    SetAuthorizationHeader(user.token);
    dispatch(userLoggedIn(user));
  });

export const logout = () => dispatch => {
  localStorage.removeItem(TOKEN_NAME);
  SetAuthorizationHeader();
  dispatch(userLoggedOut());
};
