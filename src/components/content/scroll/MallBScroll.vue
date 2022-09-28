<template>
  <div class="wrapper" ref="wrapper">
        <div>
            <slot></slot>
        </div>
  </div>
</template>

<script>
    import BScroll from 'better-scroll';
    export default {
        props:{
            probeType:{
                type:Number,
                default:0
            },
            pullUpLoad:{
                type:Boolean,
                default:false
            }
        },
        data(){
            return {
                bs:null
            }
        },
        mounted(){
            this.initScrollObj();
        },
        methods:{
            //刷新组件
            refresh(){
                this.bs&&this.bs.refresh();
            },
            //完成上拉加载更多
            finishPullUp(){
                this.bs&&this.bs.finishPullUp();
            },
            //滚动到指定位置
            scrollTo(x,y,delay=300){
                this.bs&&this.bs.scrollTo(x,y,delay)
            },
            //初始化滚动插件
            initScrollObj(){
                    //实例化滚动插件对象
                //相关配置通过组件属性来设置
                this.bs = new BScroll(this.$refs.wrapper,{
                    probeType:this.probeType,
                    pullUpLoad:this.pullUpLoad,
                    click:true
                })
                //绑定滚动监听
                if(this.probeType>=2){
                    this.bs.on("scroll",(ps)=>{
                        //通知父组件滚动事件发生
                        this.$emit("contentScroll",ps);
                    })
                }
                //绑定上拉加载更多的监听
                if(this.pullUpLoad){
                    this.bs.on("pullingUp",(ps)=>{
                    
                        //触发自定义事件 
                        this.$emit("pullingUp");

                    })
                }
            }
        }
    }
</script>

<style>

</style>