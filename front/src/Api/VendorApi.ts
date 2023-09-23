import axios from "axios";

const VendorApi=axios.create({
    baseURL:'http://localhost:3001/api',
});

VendorApi.defaults.withCredentials=true;

export default VendorApi;