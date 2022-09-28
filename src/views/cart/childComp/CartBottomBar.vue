<template>
    <div class="cart-bottom">
        <check-box :is-checked="isSelectedAll" class="check-all"/>
        <span>全选</span>
        <span class="price-total">合计:￥{{totalPrice}}</span>
        <span class="pay">去计算({{selectedCount}})</span>
    </div>
</template>

<script>
     import CheckBox from "./CheckBox"
     import {mapGetters} from "vuex"
    export default {
        components:{
            CheckBox
        },
        computed:{
            ...mapGetters([
                "cartLength",
                "cartList"
            ]),
            //计算总费用
            totalPrice(){
               
                const list = this.cartList;
                console.log(list );
                //1 获取选中的商品
                let arr = list.filter(item=>item.checked);
                //2 求累加总支持
                let total = arr.reduce((pValue,item)=>{
                    return pValue+item.price*item.count;
                },0)
                return total.toFixed(2);
            },
            //判断是否全部选中
            isSelectedAll(){
                //找没有选中的商品 如果没有找到 则表示都选中了
                return this.cartList.find(item=>item.checked==false)==undefined;
            },
            //要最终付款的商品总量
            selectedCount(){
                const list = this.cartList;
               
                //1 获取选中的商品
                let arr = list.filter(item=>item.checked);
                //2 求累加总件数
                let total = arr.reduce((pValue,item)=>{
                    return pValue+item.count;
                },0)

                return total;
            }
        }
    }
</script>

<style scoped>
    .cart-bottom{
        width:100%;
        height:44px;
        line-height:44px;
        position:fixed;
        bottom:44px;
        left:0px;
        right:0px;
        color:#888;
        background-color: #eee;
        padding-left:35px;
        box-shadow: 0 -2px 3px rgba(0, 0, 0, .2);
    }
    .check-all{
        position:absolute;
        left:12px;
        top:11px
    }
    .price-total{
        color:#666;
        margin-left: 15px;
        font-size:16px;
    }
    .pay{
        color:#fff;
        width:100px;
        float:right;
        height:44px;
        line-height:44px;
        background-color: orangered;
       text-align:center;
    }
</style>