import * as types from "./mutations-type"

const mutations={
    [types.ADD_TO_CART](state,product){
        state.cartList.push(product);
    },
    [types.INCREASE_COUNT](state,index){
        //根据序号获取商品 并且增加数量
        state.cartList[index].count++;
    }
};
export default mutations