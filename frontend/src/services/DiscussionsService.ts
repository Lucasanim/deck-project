import AxiosInstance from "../axios/axios"
import Discussion from "../models/Discussion";

const instance = AxiosInstance("/discussions");

export const fetchDiscussions = () => {
    return instance.get("/discussion")
}