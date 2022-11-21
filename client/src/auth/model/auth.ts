import { declareAction } from "@reatom/core"
import { UserApi } from "../../api/userApi"
import { declareAsyncAction } from "../../core/reatom/declareAsyncAction"
import { declareAtomWithSetter } from "../../core/reatom/declareAtomWithSetter"
import { checkUserName, cleanString } from "../../core/utils/utils"
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
        const userNameError = !checkUserName(userData.name)
        store.dispatch(setUserNameError(userNameError))

        if (userNameError) {
            return
        }

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

const [userNameAtom, setUserName] = declareAtomWithSetter<string>('name', '', on => [
    on(login, (_, value) => cleanString(value.name)),
])

const [passwordAtom, setPassword] = declareAtomWithSetter<string>('paswrd', '')

const [registerErrorAtom, setRegisterError] = declareAtomWithSetter<boolean>('registerErrorAtom', false, on => [
    on(setUserName, () => false),
])

const [loginErrorAtom, setLoginError] = declareAtomWithSetter<boolean>('loginErrorAtom', false, on => [
    on(setUserName, () => false),
    on(setPassword, () => false),
])

const [userNameErrorAtom, setUserNameError] = declareAtomWithSetter<boolean>('userNameError', false, on => [
    on(setUserName, () => false),
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
    setUserNameError,
}

export const authAtoms = {
    isAuthAtom,
    currUserAtom,
    userNameAtom,
    passwordAtom,
    registerErrorAtom,
    loginErrorAtom,
    userNameErrorAtom,
}