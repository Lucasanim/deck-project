export default interface Comment {
    id: string,
    creatorId: number,
    body: string,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date,
}