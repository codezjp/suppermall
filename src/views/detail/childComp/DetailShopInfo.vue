<template>
    <div class="shop-info" v-if="Object.keys(shop).length > 0">
        <div class="info-top">
            <img :src="shop.logo"/>
            <span class="title">{{shop.title}}</span>
        </div>
        <div class="info-middle">
            <div class="info-middle-left">
                <div class="sell-info">
                    <div class="sell-count">{{shop.cSells|sellsFormat}}</div>
                    <div class="sell-text">总销量</div>
                </div>
                <div class="goods-info">
                    <div class="goods-count">{{shop.cGoods}}</div>
                    <div class="goods-text">宝贝数量</div>
                </div>
            </div>
            <div class="info-middle-right">
                <table>
                    <tr v-for="(item,index) in shop.score" :key="index">
                        <td>{{item.name}}</td>
                        <td :class="['score',item.isBetter?'better-score':'']">{{item.score}}</td>
                        <td >
                           <span :class="['level',item.isBetter?'better-level':'']"> {{item.isBetter?"高":"低"}}</span>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
        <div class="info-bottom">
            <div class="enter-shop">
                进店逛逛
            </div>
        </div>
        
    </div>
</template>

<script>
export default {
    props:{
        shop:{
            type:Object
        }
    },
    filters:{
        sellsFormat(v){
            if(v<10000)
                return v;
            else{
                let m = v/10000;  
                return m.toFixed(1)+"万";    
            }
        }
    }
}
</script>

<style scoped>
    .shop-info{
        padding:25px 8px;
        border-bottom:5px solid  #f2f5f8
    }
    .info-top{
        display: flex;
        /* 中心线对齐 */
        align-items: center;
        line-height: 45px;
    }
    .info-top img{
        width:45px;
        height:45px;
        border:1px solid  rgba(0, 0, 0, 0.1);
        border-radius:50%;
    }
    .info-top .title{
        margin-left:10px
    }
    .info-middle{
        margin-top:15px;
        display:flex;
        align-items: center;
    }
    .info-middle>div{
        flex:1
    }
    .info-middle-left{
        display:flex;
        justify-content: space-evenly;
        text-align: center;
        color:#333;
        border-right:1px solid rgba(0, 0, 0, 0.1);
    }
    .sell-count,.goods-count{
        font-size:18px
    }
    .sell-text,.goods-text{
        font-size:12px;
        margin-top:10px
    }
    .info-middle-right table{
        margin-left:30px;
        width:120px;
        font-size: 13px;
        color: #333;
    }
    .info-bottom {
       text-align: center;
        margin-top: 10px;
        
    }
    .enter-shop{
        width:150px;
        height:30px;
        line-height: 30px;
        display: inline-block;
        background-color:#f2f5f8;
        border-radius:10px;
        font-size:12px;
        text-align: center;
      
    }
    .info-middle-right td{
        padding:5px 0px;
    }
    .score{
        color: #5ea732;
    }
    .better-score{
        color: #f13e3a;
    }
    
    .level{
        background-color:#5ea732;
        color:white;
        text-align: center;
    }
    .better-level{
        background-color:#f13e3a;
       
    }
</style>