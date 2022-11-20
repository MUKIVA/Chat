import { UserData } from "../auth/model/userData"
import { HttpStatus } from "../core/http/HttpStatus"

//const BASE_URL = '/api/'
const BASE_URL = 'http://localhost:5000/api/users/'

type UserApiResponse = {
    status: boolean,
}

async function getUser(userData: UserData): Promise<UserApiResponse> {
    const url = BASE_URL + 'login'
    const request = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({'Name': userData.name, 'Password': userData.password}),
        headers: {
            Accept: 'application/json',
        }
    })
    const response = await request.status
    console.log(JSON.stringify({'Name': userData.name, 'Password': userData.password}), response)
    return {status: response === HttpStatus.OK}
}

async function createUser(userData: UserData): Promise<UserApiResponse> {
    const url = BASE_URL + 'register_user'
    const request = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({'Name': userData.name, 'Password': userData.password}),
        headers: {
            Accept: 'application/json',
        }
    })
    const response = await request.status
    console.log(JSON.stringify({'Name': userData.name, 'Password': userData.password}), response)
    return {status: response === HttpStatus.OK}
    //return {status: true}
}

const UserApi = {
    createUser,
    getUser,
}

export {
    UserApi,
}