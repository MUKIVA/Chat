import { HubConnection } from "@microsoft/signalr"
import { declareAction } from "@reatom/core"
import { MessagesApi } from "../../api/messagesApi"
import { authActions } from "../../auth/model/auth"
import { declareAsyncAction } from "../../core/reatom/declareAsyncAction"
import { declareAtomWithSetter } from "../../core/reatom/declareAtomWithSetter"
import { messagesActions } from "./message"
import { MessageData } from "./MessageData"

const sendMessage = declareAsyncAction<Omit<MessageData, 'id'>>(
    'send',
    async (messageData, store) => {
        const connection = store.getState(connectionAtom)
        connection?.invoke('Send', messageData.text, messageData.userName)
    }
)

const deleteMessage = declareAsyncAction<string>(
    'delete',
    async (messageId, store) => {
        await MessagesApi.deleteMessage(messageId)
        store.dispatch(messagesActions.removeMessage([messageId]))
    }
)

const editMessage = declareAsyncAction<MessageData>(
    'edit',
    async (messageData, store) => {
        await MessagesApi.editMessage({
            id: messageData.id,
            text: messageData.text,
        })
        store.dispatch(messagesActions.updateMessage({
            ...messageData,
        }))
    }
)

const loadMessages = declareAsyncAction<void>(
    'load',
    async (_, store) => {
        const messages = await MessagesApi.getMessages()
        store.dispatch(messagesActions.updateMessages(messages))
    }
)

export type EditMessagePayload = {
    msg: MessageData,
    newText: string
}

const editingMessage = declareAction<string>('editing')

export const [textAtom, setText] = declareAtomWithSetter<string>('text', '', on => [
    on(sendMessage, () => ''),
    on(editMessage, () => ''),
    on(editingMessage, (_, value) => value),
])

export const [connectionAtom, setConnection] = declareAtomWithSetter<HubConnection|null>('connection', null, on => [
    on(authActions.logout, () => null),
])

export const mainActions = {
    sendMessage,
    deleteMessage,
    editMessage,
    editingMessage,
    loadMessages,
}