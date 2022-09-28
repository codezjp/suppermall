<template>
  <div v-if="Object.keys(goods).length > 0" class="base-info">
        <div class="info-title">{{goods.title}}</div>
        <div class="info-price">
            <span class="n-price">{{goods.price}}</span>
            <span class="o-price">{{goods.oldPrice}}</span>
            <span class="discount">{{goods.disCount}}</span>
        </div>
        <div class="info-other">
            <span>{{goods.columns[0]}}</span>
            <span>{{goods.columns[1]}}</span>
            <span>{{goods.services[goods.services.length-1].name}}</span>
        </div>
        <div class="info-services">
            <span v-for="index in goods.services.length-1" :key="index">
                <img :src=" goods.services[index-1].icon"/>
                <span>{{goods.services[index-1].name}}</span>
            </span> 
            
        </div>
    </div>
</template>

<script>
export default {
    props:{
        goods:{
            type:Object,
            default(){
                return {}
            }
        }
    }
}
</script>

<style scoped>
    .base-info{
        margin-top:15px;
        padding:0px 8px;
        color:#999;
        border-bottom:5px solid #f2f5f8;
    }
    .info-title{
        color:#222;
    }
    .info-price{
        margin-top:10px;
    }
    .info-price .n-price{
        font-size: 24px;
        color:var(--color-high-text);
    }
    .info-price .o-price{
        font-size: 13px;
        text-decoration: line-through;
        margin-left:10px
    }
    .info-price .discount{
        background-color: var(--color-high-text);
        border-radius: 8px;
        font-size: 12px;
        margin-left:10px;
        position: relative;
        top:-5px;
        padding: 2px 5px;
        color: #fff;
    }
    .info-other{
        margin-top:15px;
        font-size:13px;
        display:flex;
        line-height:30px;
        justify-content: space-between;
        border-bottom: 1px solid rgba(100,100,100,.1);

    }
    .info-services{
        display:flex;
        justify-content: space-between;
        line-height:60px;
    }
    .info-services img{
        width:14px;
        height:14px;
    }
    .info-services span{
        font-size:13px;
        color:#333;
    }
</style>