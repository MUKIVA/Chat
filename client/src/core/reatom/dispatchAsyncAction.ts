import {Store} from "@reatom/core";
import {AsyncActionCreator} from "./declareAsyncAction";


async function dispatchAsyncAction<PAYLOAD, SUCCESS, ERROR>(store: Store, action: AsyncActionCreator<PAYLOAD, SUCCESS, ERROR>, payload: PAYLOAD) {
    return new Promise((resolve, reject) => {
        const doneUnsub = store.subscribe(action.done, data => {
            doneUnsub()
            failUnsub()
            resolve(data)
        })
        const failUnsub = store.subscribe(action.fail, () => {
            doneUnsub()
            failUnsub()
            reject()
        })
        store.dispatch(action(payload))
    })
}

export {
    dispatchAsyncAction,
}