import {sendRequest} from "network/request"

//获取商品类别
export function getAllCategory(){
    return sendRequest({
        url:"/category",
        method:"get"
    })
}
//根据父类别key获取子类别
export function getSubcategory(maitKey) {
    return sendRequest({
      url: '/subcategory',
      params: {
        maitKey
      }
    })
  }

  //根据父类别key获取子类别
export function getGoodsByCategory(miniWallkey,type) {
  return sendRequest({
    url: '/subcategory/detail',
    params: {
      miniWallkey,type
    }
  })
}