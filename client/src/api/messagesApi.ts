import { MessageData } from '../main/model/MessageData';
import { urls } from './urls';

export type EditMessageApiPayload = {
    id: string,
    text: string,
}

function responseToMessageData(item: any): MessageData {
    return {
        id: item.id,
        userName: item.name,
        text: item.msg,
        time: new Date(item.timeMs),
    }
}

async function getMessages(): Promise<MessageData[]> {
    const url = urls.MESSAGES_API_URL + 'get_message_range?offset=' + 0 + '&count=' + 100
    const request = await fetch(url, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
        }
    })
    const response = await request.json()
    return response.map((item: any) => responseToMessageData(item))
}

const MessagesApi = {
    getMessages,
}

export {
    MessagesApi,
}