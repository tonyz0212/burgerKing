import axios from 'axios';


const instance = axios.create({
    baseURL: 'https://myburger-fea04.firebaseio.com/'
});


export default instance;