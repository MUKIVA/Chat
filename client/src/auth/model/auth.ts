import { declareAction } from "@reatom/core"
import { UserApi } from "../../api/userApi"
import { declareAsyncAction } from "../../core/reatom/declareAsyncAction"
import { declareAtomWithSetter } from "../../core/reatom/declareAtomWithSetter"
import { UserData } from "./userData"

const logout = declareAction('logout')

const login = declareAsyncAction<UserData>(
    'login',
    async (userData, store) => {
        const { status } = await UserApi.getUser(userData)

        store.dispatch(setLoginError(!status))
        store.dispatch(setIsAuth(status))

        if (status)
            store.dispatch(setCurrUser({ ...userData }))
    }
)

const register = declareAsyncAction<UserData>(
    'register',
    async (userData, store) => {
        const { status } = await UserApi.createUser(userData)

        store.dispatch(setRegisterError(!status))
        store.dispatch(setIsAuth(status))

        if (status)
            store.dispatch(setCurrUser({ ...userData }))
    }
)

const [currUserAtom, setCurrUser] = declareAtomWithSetter<UserData|null>('currUser', null, on => [
    on(logout, () => null),
])


const [isAuthAtom, setIsAuth] = declareAtomWithSetter<boolean>('isAuthAtom', false, on => [
    on(logout, () => false),
])

const [userNameAtom, setUserName] = declareAtomWithSetter<string>('name', '');
const [passwordAtom, setPassword] = declareAtomWithSetter<string>('paswrd', '');

const [registerErrorAtom, setRegisterError] = declareAtomWithSetter<boolean>('registerErrorAtom', false, on => [
    on(setUserName, () => false),
    on(login, () => false),
    on(logout, () => false),
])

const [loginErrorAtom, setLoginError] = declareAtomWithSetter<boolean>('loginErrorAtom', false, on => [
    on(setUserName, () => false),
    on(setPassword, () => false),
    on(register, () => false),
    on(logout, () => false),
])

export const authActions = {
    logout,
    login,
    register,
    setCurrUser,
    setIsAuth,
    setUserName,
    setPassword,
    setRegisterError,
    setLoginError,
}

export const authAtoms = {
    isAuthAtom,
    currUserAtom,
    userNameAtom,
    passwordAtom,
    registerErrorAtom,
    loginErrorAtom,
}