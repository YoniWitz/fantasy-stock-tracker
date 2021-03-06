import axios, { AxiosResponse } from 'axios';
import { IHolding } from '../models/IHolding';
import { ILoginUser, IRegisterUser, IUser } from '../models/IUsers';
import { history } from '../../index';
import { toast } from 'react-toastify';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
let localStorageUser: IUser;

axios.interceptors.request.use(config => {
    localStorageUser = JSON.parse(window.localStorage.getItem('user')!);
    if (localStorageUser) {
        config.headers.Authorization = `Bearer ${localStorageUser.token}`;
    }
    return config;
}, error => Promise.reject(error));

axios.interceptors.response.use(undefined, (error) => {
    if (error.message === 'Network Error' && !error.response) {
        toast.error('Network error - make sure API is running!', { autoClose: false })
    }
    else {
        const { status, config, data, statusText, headers } = error.response;
        if (status === 404 && !localStorageUser) {
            toast.error('Username and password not found');
        }
        if (status === 400) {
            if (config.method === 'get' && data.errors.hasOwnProperty('id')) {
                history.push('/notfound');
            }
            else if (statusText === 'Bad Request' && config.method === "post") {
                data.map((error: string) => toast.error(error, { autoClose: false }))
            }
            //bad update request
            else if (config.method === 'put' && statusText === "Bad Request") {
                toast.error(data);
            }
        }
        else if (status === 500) {
            toast.error('Server error - check terminal for more info');
        }
        else if (status === 401) {
            if (headers['www-authenticate'].includes('Bearer error="invalid_token", error_description="The token expired')){
                window.localStorage.removeItem('user');
                window.location.reload();
                toast.error('Session expired, Please Login Again');
            }
        }
    }
    throw error.response;
})
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
