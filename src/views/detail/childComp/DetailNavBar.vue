<template>

        <nav-bar>
            <img class="back" slot="left" @click="backClick"
            src="~assets/img/common/back.svg"/>
            <div slot="center" class="titles">
                <div class="title-item" 
                @click="navClick(index)"
                :class ="{'active': currentIndex==index }"
                v-for="(item,index) in titles" :key="index">
                    {{item}}
                </div>
            </div>
        </nav-bar>

</template>

<script>
    import NavBar from "components/common/navbar/NavBar"
export default {
    props:{
        currentIndex:{
            type:Number,
            default:0
        }
    },
    data(){
            return {
                titles:["商品","参数","评论","推荐"],
                
            }
    },
    methods:{
        navClick(i){
            //this.currentIndex=i;
            this.$emit("navClick",i);
        },
        backClick(){
            this.$router.back();
        }
    },
    components:{
        NavBar,
        
    }
}
</script>

<style  scoped>
    .titles{
        display: flex;
    }
    .title-item{
        flex:1;
        font-size: 14px;
    }
    .title-item.active{
        color:var(--color-high-text)
    }
    .back{
        margin-top:10px
    }
</style>>

