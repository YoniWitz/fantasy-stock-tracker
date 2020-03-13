import axios, { AxiosResponse } from 'axios';
import { IHolding } from '../models/IHolding';
import { ILoginUser, IRegisterUser, IUser } from '../models/IUsers';

axios.defaults.baseURL = 'http://localhost:5002/api/';
const responseBody = (response: AxiosResponse) => response.data;

const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody)
}

const holdingsUrl = 'holdings';

const HoldingsRequests = {
    list: (): Promise<IHolding[]> => requests.get(holdingsUrl),
    details: (id: string): Promise<IHolding> => requests.get(`${holdingsUrl}/${id}`),
    update: (id: string, holding: IHolding): Promise<IHolding> => requests.put(`${holdingsUrl}/${id}`, holding),
    create: (holding: IHolding): Promise<IHolding> => requests.post(holdingsUrl, holding),
    delete: (id: string) => axios.delete(`${holdingsUrl}/${id}`)
}

const usersUrl = 'users';

const UsersRequests = {
    login: (loginUser: ILoginUser): Promise<IUser> => requests.post(`${usersUrl}/login`, loginUser),
    register: (registerUser: IRegisterUser): Promise<IUser> => requests.post(`${usersUrl}/register`, registerUser)
}
export default { HoldingsRequests, UsersRequests };
