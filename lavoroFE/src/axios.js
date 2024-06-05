import axios from 'axios';
const axiosInstance =axios.create({
    baseURL : 'http://localhost:9000',                    //collegamneto con BE
});

export default axiosInstance;