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
    msg: MessageData,
    newText: string
}

const editMessage = declareAsyncAction<EditMessagePayload>(
    'edit',
    async (payload, store) => {
        const connection = store.getState(connectionAtom)
        await connection?.invoke('Update', {
            id: payload.msg.id,
            userName: payload.msg.userName,
            text: payload.newText,
            time: payload.msg.time,
        })
    }
)

const loadMessages = declareAsyncAction<void>(
    'load',
    async (_, store) => {
        const messages = await MessagesApi.getMessages()
        store.dispatch(messagesActions.updateMessages(messages))
    }
)

const [editingMessageAtom, setEditingMessage] = declareAtomWithSetter<MessageData|null>('editingMsg', null, on => [
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
    setEditingMessage,
    loadMessages,
    setConnection,
    setText,
}

export const mainAtoms = {
    connectionAtom,
    textAtom,
    editingMessageAtom,
}