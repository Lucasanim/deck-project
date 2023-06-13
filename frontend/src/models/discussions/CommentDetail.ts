export default interface CommentDetail {
    id: string,
    creatorId: number,
    creatorUserName: string,
    body: string,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date,
}