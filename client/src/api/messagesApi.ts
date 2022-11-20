import { v4 as uuidv4 } from 'uuid';
import { MessageData } from '../main/model/MessageData';
import { mockMessages } from '../main/model/MockMessages';

export type EditMessageApiPayload = {
    id: string,
    text: string,
}

function createMessage(messageData: Omit<MessageData, 'id'>): Promise<{id: string}> {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                id: uuidv4()
            })
        }, 1000)
    })
}

function deleteMessage(id: string): Promise<void> {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve()
        }, 1000)
    })
}

function editMessage(messageData: EditMessageApiPayload): Promise<void> {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve()
        }, 1000)
    })
}

async function getMessages(): Promise<MessageData[]> {
    return await new Promise(resolve => {
        setTimeout(() => {
            resolve(mockMessages)
        }, 1000)
    })
}

const MessagesApi = {
    createMessage,
    deleteMessage,
    editMessage,
    getMessages,
}

export {
    MessagesApi,
}