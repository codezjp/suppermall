import {sendRequest} from "network/request"

//获取首页头部数据
export function getHomeMultiData(){
    return sendRequest({
        url:"/home/multidata",
        method:"get"
    })
}

//根据商品类别和页码获取首页商品数据
export function getHomeGoodsList(type,page){
    return sendRequest({
        url:"/home/data",
        method:"get",
        params:{
            type,page
        }
    })
}