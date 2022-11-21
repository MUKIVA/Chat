import { UserData } from "../auth/model/userData"
import { HttpStatus } from "../core/http/HttpStatus"
import { urls } from "./urls"

type UserApiResponse = {
    status: boolean,
}

async function getUser(userData: UserData): Promise<UserApiResponse> {
    const url = urls.USERSS_API_URL + 'login'
    const request = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
            Name: userData.name,
            Password: userData.password
        }),
        headers: {
            Accept: 'application/json',
        }
    })
    const response = request.status
    return {
        status: response === HttpStatus.OK
    }
}

async function createUser(userData: UserData): Promise<UserApiResponse> {
    const url = urls.USERSS_API_URL + 'register_user'
    const request = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
            Name: userData.name,
            Password: userData.password
        }),
        headers: {
            Accept: 'application/json',
        }
    })
    const response = request.status
    return {
        status: response === HttpStatus.OK
    }
}

const UserApi = {
    createUser,
    getUser,
}

export {
    UserApi,
}