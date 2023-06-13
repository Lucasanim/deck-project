import Discussion from "../../models/discussions/Discussion";
import { GenericClient } from "../genericClient/genericClient";

const instance = new GenericClient("/discussions");

export const fetchDiscussions = () => {
    return instance.get("/discussion")
}

export const fetchDiscussionById = (id: string) => {
    return instance.get<DiscussionDetail>(`/discussion/${id}`)
}
