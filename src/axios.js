import axios from "axios";
/***
 * base url to make requests to the aws s3 database
 */
const api_key = "5ET4NH9-4M64SNC-J3X5MGD-7MHPYZB";
const instance = axios.create({
    baseURL: "https://musify-api-plus.herokuapp.com/api/" + api_key + "/",
});
export default instance;