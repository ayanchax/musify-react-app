import axios from "axios";
/***
 * base url to make requests to the aws s3 database
 */
const instance = axios.create({
    baseURL: "https://musify-aws-s3-data-endpoint.herokuapp.com",
});
export default instance;