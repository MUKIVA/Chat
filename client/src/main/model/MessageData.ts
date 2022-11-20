export type MessageData = {
    id: string,
    userName: string,
    text: string,
    time: Date,
}

export const emptyMsg = {
    id: '',
    userName: '',
    text: '',
    time: new Date(),
}
