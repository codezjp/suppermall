import * as types from "./mutations-type"

const actions={
    addToCart(content,product){

         return new Promise((resolve,rejct)=>{
                //判断该商品是否已经存在
                let pro = content.state.cartList.find(p=>p.iid==product.iid)
                //判断是否存在
                if(pro){
                    //获取已经存在的商品的序号
                    let index = content.state.cartList.indexOf(pro)
                    content.commit(types.INCREASE_COUNT,index);

                    resolve("新增了商品数量")
                }
                else{
                    //添加新商品到购物车
                    product.count=1;
                    product.checked=true;

                    content.commit(types.ADD_TO_CART,product);
                    resolve("添加购物车成功")
                }
         }) 


         
    }
}
export default actions;