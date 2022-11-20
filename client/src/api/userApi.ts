import { UserData } from "../auth/model/userData"
import { HttpStatus } from "../core/http/HttpStatus"

const BASE_URL = '/api/'
//const BASE_URL = 'http://localhost/api/'

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
    const url = BASE_URL + 'users/register_user'
    const request = await fetch(url, {
        method: 'GET',
        
        body: JSON.stringify({
            offset: 0,
            count: 10,
        }),
        mode: 'cors',
        headers: {
            Accept: 'application/json',
            'Access-Control-Allow-Origin':'*'
        }
    })
    const response = await request.status
    return {status: response !== HttpStatus.BAD_REQUEST}
}

const UserApi = {
    createUser,
    getUser,
}

export {
    UserApi,
}