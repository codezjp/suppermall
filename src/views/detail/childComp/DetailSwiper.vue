<template>
    <swiper>
          <swiper-item v-for="(item,index) in images" :key="index">
                <img :src="item"/>
          </swiper-item>
    </swiper>
</template>

<script>

    import {Swiper, SwiperItem} from "components/common/swiper"
    export default {
        props:{
            images:{
                type:Array,
                default(){
                    return [];
                }
            }
        },
        components:{
            Swiper, 
            SwiperItem
        }
    }
</script>

<style scoped>
   
</style>>

</style>