import axios from "axios";

const commonAPI = async (httpMethod, url, reqBody) =>
{
    const requestConfig = {
        method : httpMethod,
        url,
        data: reqBody
    }
    return await axios(requestConfig).then((res) => {
        return res
    }).catch(err=>{
        return err
    })
}

export default commonAPI