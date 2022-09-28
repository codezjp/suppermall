import {sendRequest} from "network/request"

//根据商品编号获取商品详细信息
export function getGoodsDetail(iid){
    return sendRequest({
        url:"/detail",
        method:"get",
        params:{
            iid
        }
    })
}

export function getRecommend(){
    return sendRequest({
        url:"/recommend",
        method:"get"
    })
}