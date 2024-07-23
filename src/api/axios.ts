import axios from "axios";

const axiosRequest = axios.create({
    baseURL: "https://preannotator.t1.test.shoofi.ae/v1",
    headers: {
        Authorization: "Basic dGVzdC10YXNrLXVzZXJuYW1lOnRlc3QtdGFzay1wYXNzd29yZA=="
    }
})


export {axiosRequest}