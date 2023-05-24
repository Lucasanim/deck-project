import AxiosInstance from "../../axios/axios"
import AuthDetails from "../../models/user/AuthDetails";

const instance = AxiosInstance("/users/auth");

export const loginRequest = (credentials: AuthDetails) => {
    return instance.post("/login", credentials)
}

export const registerRequest = (userData: AuthDetails) => {
    return instance.post("/register", userData)
}
