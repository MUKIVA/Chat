import { declareAction } from "@reatom/core"
import { declareAtomWithSetter } from "../../core/reatom/declareAtomWithSetter"
import { mockMessages } from "./MockMessages"

export type MessageData = {
    id: string,
    userName: string,
    text: string,
    time: Date,
}

export type EditMessagePayload = {
    msg: MessageData,
    newText: string
}

export const emptyMsg = {
    id: '',
    userName: '',
    text: '',
    time: new Date(),
}

function editMsgList(list: MessageData[], payload: EditMessagePayload): MessageData[] {
    const i = list.indexOf(payload.msg)
    list[i].text = payload.newText
    return [...list]
}

export const send = declareAction<MessageData>('send')
export const edit = declareAction<EditMessagePayload>('edit')
export const editing = declareAction<string>('editing')
export const del = declareAction<string>('delete')

export const [textAtom, setText] = declareAtomWithSetter<string>('text', '', on => [
    on(send, (_) => ''),
    on(edit, (_) => ''),
    on(editing, (_, value) => value),
])

export const [messagesListAtom, setMessagesList] = declareAtomWithSetter<MessageData[]>('msgList', mockMessages, on => [
    on(send, (_, value) => [..._, value]),
    on(edit, (_, value) => editMsgList(_, value)),
    on(del, (_, value) => _.filter((msg) => msg.id !== value)),
])