import { declareMapAtom } from "../../core/reatom/declareMapAtom";
import { MessageData } from "./MessageData";

const {
    atom: messagesAtom,
    updateItems: updateMessages,
    updateItem: updateMessage,
    removeItems: removeMessage,
    setNewItems: setNewMessages,
} = declareMapAtom<MessageData>(
    'messages',
    message => message.id,
)

const messagesActions = {
    updateMessages,
    updateMessage,
    removeMessage,
    setNewMessages,
}

export {
    messagesAtom,
    messagesActions,
}