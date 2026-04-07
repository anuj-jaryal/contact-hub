const axios = require('axios');

const instance = axios.create({
    //baseURL: `/backend`,
    baseURL:`${process.env.NEXT_PUBLIC_BACKEND_URL}`,
    timeout:30000,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    },
    withCredentials: true,
    withXSRFToken: true
});

export default instance;