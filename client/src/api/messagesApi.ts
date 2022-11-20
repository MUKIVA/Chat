import { resolve } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { HttpStatus } from '../core/http/HttpStatus';
import { MessageData } from '../main/model/MessageData';
import { mockMessages } from '../main/model/MockMessages';

const BASE_URL = 'http://localhost:5000/api/messages/'

export type EditMessageApiPayload = {
    id: string,
    text: string,
}

async function createMessage(messageData: Omit<MessageData, 'id'>): Promise<{id: string}> {
    const url = BASE_URL + 'add_message'
    const request = await fetch(url, {
        method: 'GET',
        body: JSON.stringify(messageData),
        //mode: 'cors',
        headers: {
            Accept: 'application/json',
            //'Access-Control-Allow-Origin':'*'
        }
    })
    const response = await request.json()
    console.log(response)
    return {
        id: uuidv4()
    }
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

function responseToMessageData(resp: any): MessageData {
    return {
        id: resp.id,
        userName: resp.name,
        text: resp.msg,
        time: new Date(resp.timeMs),
    }
}

async function getMessages(): Promise<MessageData[]> {
    const url = BASE_URL + 'get_message_range' + '?offset=0&count=100'
    const request = await fetch(url, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
        }
    })
    const response = await request.json()
    //console.log(response)
    return response.map((el: any) => responseToMessageData(el))
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