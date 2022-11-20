import { UserData } from "../auth/model/userData"

type UserApiResponse = {
    status: boolean,
}

async function getUser(userData: UserData): Promise<UserApiResponse> {
    return await new Promise(resolve => {
        setTimeout(() => {
            const resp = {
                status: true,
                //status: false,
            }
            resolve(resp)
        }, 1000)
    })
}

async function createUser(userData: UserData): Promise<UserApiResponse> {
    return await new Promise(resolve => {
        setTimeout(() => {
            const resp = {
                //status: true,
                status: false,
            }
            resolve(resp)
        }, 1000)
    })
}

const UserApi = {
    createUser,
    getUser,
}

export {
    UserApi,
}