<template>
    <div class="toast" v-show="isShow">
        {{message}}
    </div>
</template>

<script>
export default {
    data(){
        return {
            isShow:false
        }
    },
    props:{
        message:{
            type:String
        },
        waitSeconds:{
            type:Number,
            default:3000
        }
    },
    methods:{
        close(){
             //等待一定时间消失
             setTimeout(()=>{
                this.isShow =false;
            },this.waitSeconds)
        },
        show(){
            this.isShow = true;
        }
    }
}
</script>

<style scoped>
    .toast{
        position:fixed;
        left:50%;
        top:50%;
        background-color:rgba(0,0,0, 0.7);
        color:white;
        transform: translate(-50%,-50%);
        padding:8px 10px;
        border-radius:5px;
    }
</style>>
