import Axios, { AxiosInstance } from 'axios';

const instance:AxiosInstance = Axios.create({
    baseURL: 'https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/',
});

async function searchLocation(query:string){
    const res = await instance.request({
        url:'location/search',
        method: 'get',
        params: {
            query
        },
    });

    console.log(res);
    return res.status === 200?res.data:[];
}

async function searchLocationByGeo({latitude, longitude}){
    const res = await instance.request({
        url:'location/search',
        method: 'get',
        params: {
            lattlong: `${latitude},${longitude}`
        },
    });

    console.log(res);
    return res.status === 200?res.data:[];
}

async function getLocationWeater(woeid:number){
    const res = await instance.request({
        url:`/api/location/${woeid}/`,
        method: 'get',
    });

    console.log(res);
    return res.status === 200?res.data:null;
}

export { searchLocation, searchLocationByGeo, getLocationWeater };