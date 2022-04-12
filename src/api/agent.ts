import axios, { AxiosResponse } from 'axios';

axios.defaults.baseURL = 'https://itunes.apple.com';

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const SearchResult = {
    get: <T>(searchEntry: string) => axios.get<T>(`/search?term=${searchEntry}`).then(responseBody),
}

const agent = {
    SearchResult
}

export default agent;

