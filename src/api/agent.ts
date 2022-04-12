import axios, { AxiosResponse } from 'axios';

axios.defaults.baseURL = 'https://itunes.apple.com/search?term=';

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const SearchResult = {
    get: <T>(searchEntry: string) => axios.get<T>(searchEntry).then(responseBody),
}

const agent = {
    SearchResult
}

export default agent;

