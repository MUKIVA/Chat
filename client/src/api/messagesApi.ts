import { resolve } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { HttpStatus } from '../core/http/HttpStatus';
import { MessageData } from '../main/model/MessageData';
import { mockMessages } from '../main/model/MockMessages';

const BASE_URL = '/api/messages/'

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
    // return await new Promise(resolve => {
    //     setTimeout(() => {
    //         resolve(mockMessages)
    //     }, 1000)
    // })
    const url = BASE_URL + 'get_message_range'
    const request = await fetch(url, {
        method: 'GET',
        
        body: JSON.stringify({
            offset: 0,
            count: 10,
        }),
        mode: 'cors',
        headers: {
            Accept: 'application/json',
            'Access-Control-Allow-Origin':'*'
        }
    })
    const response = await request.json()
    return response.messages
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