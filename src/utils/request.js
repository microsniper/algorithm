
import axios from "axios";

const $httpRequest = axios.create({
  baseURL : process.env.BASE_API,
  timeout: 15000
})


export default $httpRequest;
