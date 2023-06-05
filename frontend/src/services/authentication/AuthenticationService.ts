import axios from "axios";
import AuthDetails from "../../models/user/AuthDetails";
import Token from "../../models/user/Token";

const instance = axios.create({
    baseURL: import.meta.env.VITE_GATEWAY_BASE_URL + "/users/auth",
    timeout: 1000
});

export const loginRequest = (credentials: AuthDetails) => {
    return instance.post("/login", credentials)
}

export const registerRequest = (userData: AuthDetails) => {
    return instance.post("/register", userData)
}

export const refreshTokenRequest = (tokenData: Token) => {
    return instance.post("/refresh-token", tokenData)
}
