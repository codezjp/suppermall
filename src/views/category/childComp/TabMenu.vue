<template>
    <mall-b-scroll ref="scroll" class="tab-menu">
       <div>
            <div v-for="(item,index) in category" 
                 @click="itemClick(index)"
                 :class="{'active':curIndex==index}"
                :key="index" class="menu-list-item">
                {{item.title}}
            </div>
        </div>
    </mall-b-scroll> 
</template>

<script>
    import MallBScroll from "components/content/scroll/MallBScroll"
    export default {
        data(){
            return {
                curIndex:0
            }
        },
        props:{
            category:{
                type:Array,
                default(){
                    return [];
                }
            }
        },
        updated(){
            console.log( 1111);
            this.$refs.scroll&&this.$refs.scroll.refresh();
        },
        methods:{
            itemClick(index){
                this.curIndex =index;
                this.$emit("categoryItemClick",index)
            }
        },
        components:{
            MallBScroll
        }
    }
</script>

<style scoped>
    .tab-menu{
        width:95px;
        height:100%;
        background-color:#f6f6f6;
        box-sizing:border-box;
        z-index:0;
        overflow: hidden;
    }
    .menu-list-item{
        height:45px;
        line-height:45px;
        text-align: center;
        font-size:14px;
    }
    .active{
        border-left:3px solid var(--color-high-text);
        color:var(--color-high-text);
        background-color:#fff;
        font-weight:700
    }
</style>