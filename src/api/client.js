// const LOCAL_BASE_PATH = `http://127.0.0.1:1337`
const SERVER_BASE_PATH = `https://necessary-friend-0f1cdb2c9b.strapiapp.com`

const API_PATH = '/api'

// const ACCESS_TOKEN = 'd8c8d759ec3b658a66d59cc568aa6debf868aa0809fc2dfc383ff6c44cc2585eed51bd0a0e2386f319008f2da970d2baa4f2ba378d21eee6726c3ccf7206cd85a956838f521cc9dab253373d802cbdf3b01fe2c03c40d8afcec912966a6a59c9f90ca2d9b2f36658ace03b4066359aa8518fff3e4646bf3d29ab1a8b05957041'
const DEPLY_ACCESS_TOKEN = '01e279f94565c3232e92fb431596ba8e28fd6ce630192f794d3ecf82ced755562b0effa7d81dd37f75b5d686742d1a63850f203a49c01c0bb9b5c717c357c06c187ff6703c93d95dcb2494c65b120ed0b7c8ed85c8185944f7e95aab678811adb6f66c2d271f79801abad1f7936ec7e67f1e0e7eb2738a3950bb1eeb3e15b2b7'

const POST_HEADERS = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${DEPLY_ACCESS_TOKEN}`
}


class RestAPI {

    constructor() {}

    get = (path) => {
        const url = `${SERVER_BASE_PATH}${API_PATH}${path}`
        return fetch(url, { method: 'GET' })
    }

    post = (path, request) => {
        const url = `${SERVER_BASE_PATH}${API_PATH}${path}`
        return fetch(url, {
            method: 'POST',
            headers: POST_HEADERS,
            body: JSON.stringify(request)
        })
    }

    delete = (path) => {
        const url = `${SERVER_BASE_PATH}${API_PATH}${path}`
        return fetch(url, {
            method: 'DELETE',
            headers: POST_HEADERS
        })
    }

    getRestaurants = (page, pageSize) => {
        console.log(page, pageSize)
        return this.get(`/restaurants?pagination[page]=${page}&pagination[pageSize]=${pageSize}&populate=*`)
    }

    saveRestaurant = (restaurant) => {
        return this.post("/restaurants", { data: restaurant })
    }

    deleteRestaurant = (id) => {
        return this.delete(`/restaurants/${id}`)
    }

}

const restAPI = new RestAPI();
Object.freeze(restAPI);
export default restAPI;