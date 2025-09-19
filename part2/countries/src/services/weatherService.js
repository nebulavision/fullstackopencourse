import axios from "axios";

const API_KEY = '4e0cf67417824f8eaeb135218251909'
const BASE_URL= `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=[countryName]`

const getWeather = (countryName) => {
    return axios
        .get(BASE_URL.replace('[countryName]', countryName))
        .then(res => res.data);
};

export default { getWeather };
