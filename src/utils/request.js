import axios from 'axios'

// const loginToken = localStorage.getItem('loginToken') 

const initOptions = {
    headers: {
        'Range': 'bytes=0-99',
        'Accept': 'application/json;charset=utf-8',
        'Accept-Language': 'zh-CN,zh',
        'Content-Type': 'application/json;charset=utf-8',
    },
    params: {
        'timeout': 300000,
        'responseData': 'json',
        'maxContentLength': 200000,
    }
}

const instance = axios.create({
    timeout: 300000,
    baseURL: '/commit/api',
    headers: {
        ...initOptions.headers,
    },
    ...initOptions.params,
    // validateStatus: (status) => validateStatus(status)
})

// 拦截请求
instance.interceptors.request.use(
    config => {
        const token = sessionStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = token;
        }
        return config
    },
    error => {
        Promise.reject(error)
    }
)

export function request(url, options = {}) {
    return new Promise((resolve, reject) => {
        instance({
            url,
            method: (options.method || 'post').toLowerCase(),
            data: { ...options.data },
            responseType: options.responseType ? options.responseType : 'json'
        }).then((res) => {
            resolve(res.data)
        }).catch((err) => {
            reject(err)
        })
    })
}