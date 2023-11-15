import axios , { AxiosResponse } from "axios";
axios.defaults.baseURL = import.meta.env.VITE_APP_BACKEND_URL;


const responseBody = (response: AxiosResponse) => response.data;


const createFormData = (item: any) => {
    let formData = new FormData();
    for (const key in item) formData.append(key, item[key]);
    return formData;
};

const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    delete: (url: string , body: {}) => axios.delete(url, body).then(responseBody),
};

const Account = {
    login : (value: any) => requests.post("/api/Account/Login" , createFormData(value)) ,
    register : (value: any) => requests.post("/api/Account/Register" , createFormData(value)) ,
    getAccountById : (accountId: any) => requests.get(`/api/Account/GetAccountById/${accountId}`),
    getFriends: (accountId: any) => requests.get(`/api/Account/GetAllFriend/${accountId}`) ,
    searchName : (name: string) => requests.get(`/api/Account/GetAccountByName/${name}`)
}; 

const Content = {
    getFriendContents : (accountId: any) => requests.get(`/api/Content/GetContentByFriendAccountId/${accountId}`) ,
    create : (value: any) =>  {
        let formData = new FormData();
        for (const key in value) formData.append(key, value[key]);
        for (let i = 0; i < value.FormFiles.length; i++) formData.append("FormFiles", value.FormFiles[i]);
        return requests.post("/api/Content", formData);
    }
}; 

const Tracking = {
    follow : (value: any) => requests.post("/api/Tracking/Follow" , createFormData(value)) ,
    unFollow : (value: any) => requests.post("/api/Tracking/UnFollow" , createFormData(value)) ,
    getSinglyTracking : (accountId: any , friendId : any) => 
        requests.get(`/api/Tracking/GetSinglyTracking/${accountId}/${friendId}`) ,
    getAllTracking : () => requests.get("api/Tracking")
};

const Comment = {
    getCommentByContentId : (contentId: any) => requests.get(`/api/Comment/GetCommentByContentId/${contentId}`) ,
    create : (value: any) => requests.post("/api/Comment" , createFormData(value))
};

const agent = {
    Account ,
    Content ,
    Tracking ,
    Comment
};

export default agent;