<template>
    <div class="goods-info" v-if="Object.keys(detailInfo).length > 0">
        <div class="info-desc">
            <div class="star">

            </div>
            <div class="desc">
                {{detailInfo.desc}}
            </div>
            <div class="end"></div>
        </div>
        <div class="info-key">
            {{detailInfo.detailImage[0].key}}
        </div>
        <div class="info-list">
            <img  v-for="(item,index) in detailInfo.detailImage[0].list" 
                    :src="item"            
            :key="index" @load="imgeLoad"/>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        detailInfo:{
            type:Object
        }
    },
    methods:{
        imgeLoad(){
            this.$bus.$emit("itemImgLoaded")  
        }
    }

}
</script>

<style scoped>
    .goods-info{
        border-bottom:5px solid #f2f5f8;
        padding:20px 0px;
    }
    .info-desc{
        padding:0px 15px
    }
    .info-desc .desc{
        padding: 15px 0;
        font-size: 14px;
    }
    .info-desc .star,.info-desc .end{
        width:90px;
        height:1px;
        background-color:#a3a3a5;
        position:relative
    }
    .info-desc .star{
        float:left
    }
    .info-desc .end{
        float:right
    }

    .info-desc .star::before,.info-desc .end::after{
        content:"";
        width:5px;
        height:5px;
        background-color:#333;
        position: absolute;
        bottom:0px
    }
    .info-desc .end{
        right:0px
    }
    .info-key{
        margin:10px 0px 10px 15px;
        font-size:15px;
        color:#333
    }
    .info-list img {
        width: 100%;
    }
</style>