const base = 'http://127.0.0.1:8000/api'
// const authToken = "Bearer $2y$10$FlOGWK5tYonpmWcYdyBTk.V0r1x9.EuDwTMvFKKMDqZbmbyWyCEdC::1"
let authToken = ""
let type = ""
let username = ""
let Id = ""

export const setAuthToken = (token, id) => {
    authToken = `Bearer ${token}::${id}`
    console.log(authToken)
}
export const setType = (t) => {
    type = t
}

export const getType = () => {
    return type;
}
export const setUname = (uname) => {
    username = uname;
}
export const getUname = () => {
    return username;
}
export const setId = (id) => {
    Id = id;
}
export const getId = () => {
    return Id;
}

export const routes = {
    login: `${base}/login`,
    register: `${base}/register`,
    logout: `${base}/logout`,
    allUsers: `${base}/users`,
    getUser: id=> `${base}/user/${id}`,
    changeActiveStatus: `${base}/change-active-status`,
    editUser: `${base}/edit/user`,
    deleteUser: `${base}/delete/user`,
    uploadFile: `${base}/file/upload`,
    allFiles: `${base}/file/all`,
    allFileGroups: id => `${base}/file/groups/all/${id}`,
    allGroupData: id => `${base}/file/groups/all-data/${id}`
}

export const callApi = async (url) => {
    let data = null
    try {
        let res = await fetch(url, {
            headers: {
                "Authorization": authToken,
                "Accept": "application/json"               
            }
        })
        const contentType = res.headers.get("content-type");
        
        if(contentType.indexOf("application/json") === -1) {
            data = await res.text()
        } else {
            data = await res.json()
        }
        return data
    } catch (e) {
        return e
    }    
}

export const postValue = async (url, data) => {
    let result = null
    try {
        let result =  await fetch(url, {
            method: 'POST',
            headers: {
                "Authorization": authToken,
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(data)
        })
        return result.json()
    } catch (e) {
        return e
    }
}
export const postFormValue = async (url, data) => {
    let result = null
    let formData = new FormData();
    for (const [key, value] of Object.entries(data)) {
        console.log(key, value)
        formData.append(key, value)
    }

    try {
        let res =  await fetch(url, {
            method: 'POST',
            headers: {
                "Authorization": authToken,
                "Accept": "application/json"
            },
            body: formData
        })
        
        const contentType = res.headers.get("content-type");
        
        if(contentType.indexOf("application/json") === -1) {
            result = await res.text()
        } else {
            result = await res.json()
        }
        return result
    } catch (e) {
        return e
    }
}