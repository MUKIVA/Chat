import { declareAction } from "@reatom/core"
import { declareAtomWithSetter } from "../../core/reatom/declareAtomWithSetter"
import { UserData } from "./userData"

export const login = declareAction<UserData>()
export const logout = declareAction()

export const [currUserAtom, setCurrUser] = declareAtomWithSetter<UserData|null>('1', null, on => [
    on(login, (_, value) => value),
    on(logout, (_) => null),
])

export const [isAuthAtom, setIsAuth] = declareAtomWithSetter<boolean>('2', false, on => [
    on(login, (_) => true),
    on(logout, (_) => false),
])