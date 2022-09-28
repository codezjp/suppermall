<template>
    <div>
        <grid-view :cols="3" :lineSpace="15" :v-margin="20">
            <div class="item" v-for="(item,index) in childCategory" :key="index">
                <a :href="item.link">
                    <img class="item-img" :src="item.image"/>
                    <div class="item-txt">
                        {{item.title}}
                    </div>
                </a>
            </div>
        </grid-view>
    </div>
</template>

<script>
    import GridView from "components/common/gridView/GridView"
export default {
    components:{GridView},
    props:{
        childCategory:{
            type:Array,
            default(){
                return [];
            }
        }
    }
}
</script>

<style scoped>
    .item{
        font-size:12px;
        text-align:center
    }
    .item-img{
        width:80%
    }
    .item-txt{
        margin-top:15px
    }
</style>

