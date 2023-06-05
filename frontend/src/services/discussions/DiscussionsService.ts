import { GenericClient } from "../genericClient/genericClient";

const instance = new GenericClient("/discussions");

export const fetchDiscussions = () => {
    return instance.get("/discussion")
}