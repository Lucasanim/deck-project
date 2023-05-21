import AxiosInstance from "../../axios/axios"
import AuthDetails from "../../models/user/AuthDetails";

const instance = AxiosInstance("/users/auth");

export const login = (credentials: AuthDetails) => {
    return instance.post("/login", credentials)
}

export const register = (userData: AuthDetails) => {
    return instance.post("/register", userData)
}
