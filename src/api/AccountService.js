import { POST } from "./ApiHelperService";

export default {
    login: credentials =>
        POST("account/login", credentials),
    loginByToken: token =>
        POST("account/loginByToken", { token }),
    confirm: token =>
        POST("account/confirmation", { token }),
    resetPasswordRequest: email =>
        POST("account/reset_password_request", { email }),
    validateToken: token =>
        POST("account/validate_token", { token }),
    resetPassword: data =>
        POST("account/reset_password", { data }),
    register: user =>
        POST("account/register", user),
};
