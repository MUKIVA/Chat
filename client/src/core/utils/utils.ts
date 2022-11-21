import { UserData } from "../../auth/model/userData"
import { MessageData } from "../../main/model/MessageData"

export function cleanString(str: string): string {
    return str.trim().replace(/\s+/g,' ')
}

export function createSendingMessage(currUser: UserData|null, text: string): Omit<MessageData, 'id'> {
    return {
        userName: currUser?.name || '',
        text: text,
        time: new Date(),
    }
}

export function convertDateToString(date: Date): string {
    return date.toLocaleTimeString() + ' ' + date.toLocaleDateString();
}

export function checkUserName(name: string): boolean {
    return RegExp(/^[0-9a-zA-Z\-_]+$/).test(name);
}