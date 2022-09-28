<template>
     <div class="tab-bar-item" @click="itemClick">
            <div class="item-icon">
                <slot name="item-normal-img" v-if="!isActive"></slot>
                <slot name="item-active-img" v-else></slot>
            </div>
            <div class="item-txt" :style="isActive?{color:activeColor}:{}">
                <slot name="item-text" ></slot>
            </div>
     </div>
</template>

<script>
export default {
    props:{
        path:{
            type:String,
            required:true
        },
        activeColor:{
            type:String,
            default:"red"
        }
    },
    computed:{
        isActive(){
            //当前激活路由的路径  当前组件的path
            return this.$route.path.indexOf(this.path)>=0;
        }
    },
    methods:{
        itemClick(){
            this.$router.replace(this.path);
        }
    }

}
</script>

<style>
   .tab-bar-item {
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
  }
  .tab-bar-item img {
    width: 24px;
    height: 24px;
    margin-top: 3px;
    vertical-align: middle;
    margin-bottom: 2px;
  }
</style>