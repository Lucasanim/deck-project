import AxiosInstance from "../../axios/axios"

const instance = AxiosInstance("/discussions");

export const fetchDiscussions = () => {
    return instance.get("/discussion")
}