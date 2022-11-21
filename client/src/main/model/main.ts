import { HubConnection } from "@microsoft/signalr"
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
        await connection?.invoke('Send', messageData.text, messageData.userName)
    }
)

const deleteMessage = declareAsyncAction<string>(
    'delete',
    async (messageId, store) => {
        const connection = store.getState(connectionAtom)
        await connection?.invoke('Delete', messageId)
    }
)

export type EditMessagePayload = {
    id: string,
    text: string
}

const editMessage = declareAsyncAction<EditMessagePayload>(
    'edit',
    async (payload, store) => {
        console.log('input:', payload.id)
        // store.dispatch(messagesActions.updateMessage({
        //     id: payload.id,
        //     userName: '!',
        //     text: payload.text,
        //     time: new Date()
        // }))

        const connection = store.getState(connectionAtom)
        await connection?.invoke('Update', payload.id, payload.text)
    }
)

const loadMessages = declareAsyncAction<void>(
    'load',
    async (_, store) => {
        const messages = await MessagesApi.getMessages()
        store.dispatch(messagesActions.updateMessages(messages))
    }
)

const [editingMessageIdAtom, setEditingMessageId] = declareAtomWithSetter<string|null>('editingMsg', null, on => [
    on(editMessage, () => null),
])

const [textAtom, setText] = declareAtomWithSetter<string>('text', '', on => [
    on(sendMessage, () => ''),
    on(editMessage, () => ''),
])

const [connectionAtom, setConnection] = declareAtomWithSetter<HubConnection|null>('connection', null, on => [
    on(authActions.logout, () => null),
])

export const mainActions = {
    sendMessage,
    deleteMessage,
    editMessage,
    setEditingMessageId,
    loadMessages,
    setConnection,
    setText,
}

export const mainAtoms = {
    connectionAtom,
    textAtom,
    editingMessageIdAtom,
}