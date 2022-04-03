import axios from 'axios';

const baseURL = 'https://api.artic.edu/api/v1/artworks';
// const API = axios.create({ baseURL: baseURL });


export async function queryData(page,limit) {
    try {
        const result = await axios({
            method: 'GET',
            url: `${baseURL}?page=${page}&limit=${limit}`
        });
        return result;
    } catch (error) {
        throw error;
    }
}

export async function querySearch(query) {
    try {
        const result = await axios({
            method: 'GET',
            url: `${baseURL}/search?q=${query}`
        })        
        ;
        return result;
    } catch (error) {
        throw error;
    }
}

export async function queryDetailData(identifier) {
    try {
        const result = await axios({
            method: 'GET',
            url: `${baseURL}/${identifier}`
        });
        return result;
    } catch (error) {
        throw error;
    }
}