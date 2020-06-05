import axios from 'axios'
import QS from 'qs'; 
import { DEV_BASEURL, PRO_BASEURL } from '../config/index'

// http://www.axios-js.com/zh-cn/docs/#axios-create-config 官网配置地址

const service = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? DEV_BASEURL : PRO_BASEURL, // api的base_url
  timeout: 5000,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
  },
  withCredentials: true
})



// 添加请求拦截器
service.interceptors.request.use( config => 
  {        
    // 每次发送请求之前判断vuex中是否存在token        
    // 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
    // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断 
    // const token = store.state.token;        
    // token && (config.headers.Authorization = token);        
    return config;    
  },    
  error => {        
    return Promise.error(error);    
  }
);

// 响应拦截器
service.interceptors.response.use(    
  response => {   
    // console.log('code', response ) 
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据     
    // 否则的话抛出错误
    if (response.data.code === 200) {            
      return Promise.resolve(response);        
    } else {            
      return Promise.reject(response);        
    }    
  },    
  // 服务器状态码不是2开头的的情况
  // 这里可以跟你们的后台开发人员协商好统一的错误状态码    
  // 然后根据返回的状态码进行一些操作，例如登录过期提示，错误提示等等
  // 下面列举几个常见的操作，其他需求可自行扩展
  error => {            
    if (error.data.code) {         
      switch (error.data.code) {                
          // 401: 未登录
          // 未登录则跳转登录页面，并携带当前页面的路径
          // 在登录成功后返回当前页面，这一步需要在登录页操作。                
          // case 401:                    
          //     router.replace({                        
          //         path: '/login',                        
          //         query: { 
          //           redirect: router.currentRoute.fullPath 
          //         }
          //     });
          //     break;

          // // 403 token过期
          // // 登录过期对用户进行提示
          // // 清除本地token和清空vuex中token对象
          // // 跳转登录页面                
          // case 403:
          //     Toast({
          //         message: '登录过期，请重新登录',
          //         duration: 1000,
          //         forbidClick: true
          //     });
          //     // 清除token
          //     localStorage.removeItem('token');
          //     store.commit('loginSuccess', null);
          //     // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面 
          //     setTimeout(() => {                        
          //         router.replace({                            
          //             path: '/login',                            
          //             query: { 
          //                 redirect: router.currentRoute.fullPath 
          //             }                        
          //         });                    
          //     }, 1000);                    
          //     break; 

          // // 404请求不存在
          // case 404:
          //     Toast({
          //         message: '网络请求不存在',
          //         duration: 1500,
          //         forbidClick: true
          //     });
          //     break;
          // // 其他错误，直接抛出错误提示
          // default:
          //     Toast({
          //         message: error.response.data.message,
          //         duration: 1500,
          //         forbidClick: true
          //     });
      }
      return Promise.reject(error.response);
    }
  }    
);


//  导出实例 以便自定义 调用
export const instance = service;

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params, config){    
  return new Promise((resolve, reject) =>{        
    service.get(url, {params: params, ...config}).then(res => {
      resolve(res.data);
    }).catch(err =>{
      reject(err.data)        
  })    
});}


/** 
 * post方法，对应post请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数]  //
 */
export function post(url, data, config) {
  return new Promise((resolve, reject) => {
    service.post(url, QS.stringify(data), config)
    .then(res => {
      resolve(res.data);
    })
    .catch(err =>{
      reject(err.data)
    })
  });
}

