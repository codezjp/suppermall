//1 导入axios
import axios from "axios"

export function sendRequest(config){

    return new Promise((resolve,reject)=>{
         //1创建axios的实例
        const instance1 = axios.create({
            baseURL:"http://152.136.185.210:7878/api/hy66",
            timeout:3000
        });

        //2.1 拦截请求
        instance1.interceptors.request.use(config=>{
                
                return config
                
        },err=>{

        })

        //2.2 拦截相应
        instance1.interceptors.response.use(res=>{
       
            return res.data;     
        },err=>{

        })


        //3发送网络请求
        instance1(config).then(res=>{
            resolve(res);
        }).catch(err=>{
            reject(err);
        })
    })
   

}