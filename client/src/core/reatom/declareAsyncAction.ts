import {declareAction, Store, PayloadActionCreator} from "@reatom/core";

type AsyncActionCreator<PAYLOAD, DONE, ERROR> = PayloadActionCreator<PAYLOAD, string> & {
    done: PayloadActionCreator<DONE>,
    fail: PayloadActionCreator<ERROR>,
}

function declareAsyncAction<PAYLOAD, SUCCESS = void, ERROR = void>(
    name: string,
    handler: (payload: PAYLOAD, store: Store) => Promise<any>
): AsyncActionCreator<PAYLOAD, SUCCESS, ERROR> {
    const done = declareAction<SUCCESS>(`${name}[done]`)
    const fail = declareAction([`${name}[fail]`])

    function reaction(payload: PAYLOAD, store: Store) {
        handler(payload, store)
            .then(data => {
                store.dispatch(
                    done(data),
                )
            })
            .catch(() => {
                store.dispatch(
                    fail(),
                )
            })
    }

    const action = declareAction([name], reaction)
    // @ts-ignore
    action.done = done
    // @ts-ignore
    action.fail = fail
    // @ts-ignore
    return action
}

export {
    declareAsyncAction,
}

export type {
    AsyncActionCreator,
}