import axios from 'axios';

export default axios.create({
    baseURL: 'https://api.unsplash.com',
    headers: {
        Authorization: 'Client-ID AGn_dwNnRJJ5MO6xnSzCwNCBjUB0ToEJmYuF9yBSP1E',
    }
})
