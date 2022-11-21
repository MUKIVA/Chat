import { HubConnection } from "@microsoft/signalr"
import { MessagesApi } from "../../api/messagesApi"
import { authActions } from "../../auth/model/auth"
import { declareAsyncAction } from "../../core/reatom/declareAsyncAction"
import { declareAtomWithSetter } from "../../core/reatom/declareAtomWithSetter"
import { cleanString } from "../../core/utils/utils"
import { messagesActions } from "./message"
import { MessageData } from "./MessageData"

const sendMessage = declareAsyncAction<Omit<MessageData, 'id'>>(
    'send',
    async (messageData, store) => {
        const validMsg = cleanString(messageData.text)
        if (validMsg) {
            const connection = store.getState(connectionAtom)
            await connection?.invoke('Send', validMsg, messageData.userName)
        }
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
        const validMsg = cleanString(payload.newText)
        if (validMsg) {
            const connection = store.getState(connectionAtom)
            await connection?.invoke('Update', {
                id: payload.msg.id,
                userName: payload.msg.userName,
                text: validMsg,
                time: payload.msg.time,
            })
        }
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
