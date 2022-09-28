<template>
    <div class="tab-control">
        <div class="tab-control-item" 
            @click="tabClick(index)"
             :class ="{'active': currentIndex==index }"
             v-for="(title,index) in titles" :key="index">
            <span>{{title}}</span>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        titles:{
            type:Array,
            default(){
                return []
            }
        }
    },
    data(){
        return {
            currentIndex:0
        }
    },
    methods:{
        tabClick(i){
           
            this.currentIndex =i;
            //通过emit 子组件传递类别序号给父组件
            this.$emit("tabItemClick",i)
        }
    }
}
</script>

<style>
    .tab-control{
        display:flex;
        text-align: center;
        font-size:12px;
        height: 40px;
        line-height: 40px;
        background-color: #fff;
    }
    .active{
        color:var(--color-tint);
       
       
    }
    .tab-control-item{
        flex:1;
        
    }
    .active span{
        padding:5px;
        border-bottom:3px solid var(--color-high-text);
    }
</style>