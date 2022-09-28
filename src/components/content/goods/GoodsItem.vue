<template>
    <div class="goods-item" @click="itemClick(goodsInfo.iid)">
        <img v-lazy="showImg" @load="imageLoad"/>
        <div class="info">
            <p class="title">{{goodsInfo.title}}</p>
            <span class="price">{{goodsInfo.price}}</span>
            <span class="collect"> {{goodsInfo.cfav}}</span>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        goodsInfo:{
            type:Object,
            default(){
                return {}
            }
        }
    },
    computed:{
        showImg(){
         
            return this.goodsInfo.img||this.goodsInfo.image|| this.goodsInfo.show.img;
        }
    },
    methods:{
            imageLoad(){
             this.$bus.$emit("itemImgLoaded")  
            },
            //点击商品
            itemClick(iid){
                //路由到Detail视图 传递参数id
                this.$router.push({
                    path:"/detail",
                    query:{
                        iid
                    }
                })
            }
    }
}
</script>

<style scoped>
    .goods-item{
        position: relative;
        padding-bottom: 40px;
    }
    .goods-item img{
        width:100%;
        border-radius: 5px;
    }
    .info{
        font-size: 12px;
        position: absolute;
        bottom: 5px;
        left: 0;
        right: 0;
        overflow: hidden;
        text-align: center;
    }
    .info p{
        /* 超过宽度自动裁剪 */
        overflow: hidden;
        /* 多余部分使用省略号 */
        text-overflow: ellipsis;
        /* 文字不换行 */
        white-space: nowrap;
        margin-bottom: 3px;
    }
    .info .price {
        color: var(--color-high-text);
        margin-right: 20px;
    }
    .info .collect {
        position: relative;
    }
    /* 票数标签的第一个伪子元素 */
    .info .collect::before {
        content: '';
        position: absolute;
        left: -10px;
        top: -1px;
        width: 14px;
        height: 14px;
        /* 0 0/14px 表示   background-position/background-size的形式 */
        background: url("~assets/img/common/collect.svg") 0 0/14px;
    }
</style>