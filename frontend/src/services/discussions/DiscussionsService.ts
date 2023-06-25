import Discussion from "../../models/discussions/Discussion";
import DiscussionDetail from "../../models/discussions/DiscussionDetail";
import { GenericClient } from "../genericClient/genericClient";

const instance = new GenericClient("/discussions/discussion");

export const fetchDiscussions = () => {
    return instance.get<Discussion[]>("/")
}

export const fetchDiscussionById = (id: string) => {
    return instance.get<DiscussionDetail>(`/${id}`)
}

export const createDiscussion = (discussion: Discussion) => {
    return instance.post<Discussion>("/", discussion)
}
