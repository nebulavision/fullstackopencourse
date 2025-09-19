import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL= `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=[countryName]`

const getWeather = (countryName) => {
    return axios
        .get(BASE_URL.replace('[countryName]', countryName))
        .then(res => res.data);
};

export default { getWeather };
