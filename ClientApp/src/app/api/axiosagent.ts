import axios, { AxiosResponse } from 'axios';
import { IHolding } from '../models/IHolding';

axios.defaults.baseURL = 'http://localhost:5002/';
const responseBody = (response: AxiosResponse) => response.data;

const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: IHolding) => axios.post(url, body).then(responseBody),
    put: (url: string, body: IHolding) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody)
}

const holdingsUrl = 'holdings';

const Holdings = {
    list: () => requests.get(holdingsUrl),
    details: (id: string) => requests.get(`${holdingsUrl}/${id}`),
    update: (id: string, holding: IHolding) => requests.put(`${holdingsUrl}/${id}`, holding),
    create: (activity: IHolding) => requests.post(holdingsUrl, activity),
    delete: (id: string) => axios.delete(`${holdingsUrl}/${id}`)
}

export default { Holdings };
