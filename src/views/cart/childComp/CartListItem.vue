<template>
    <div class="product-info" v-if="Object.keys(product).length>0">
        <div class="item-select">
            <check-box 
            @checkedclick="checkBoxClick"
			 :is-checked="this.product.checked"/>
        </div>
        <div class="item-img">
            <img :src="product.image"/>
        </div>
        <div class="item-info">
            <div class="item-title">
                {{product.title}}
            </div>
            <div class="item-desc">
                {{product.desc}}
            </div>
            <div class="item-bottom">
                <div class="item-price left">
                    ￥{{product.price}}
                </div>
                <div class="item-count right">
                    x{{product.count}}
                </div>
            </div>  
        </div>
    </div>
</template>

<script>
    import CheckBox from "./CheckBox"
export default {
    props:{
        product:{
            type:Object
        }
    },
    methods:{
        checkBoxClick(){
            this.product.checked = ! this.product.checked
        }
    },
    components:{
        CheckBox
    }
}
</script>

<style scoped>
    .product-info{
        width:100%;
        display:flex;
        padding:5px;
        border-bottom:1px solid #ccc;
    }
    .item-select{
        width:20px;
        display:flex;
        align-items: center;
        justify-content:center ;
    }
    .item-img{
        padding:5px;
    }
    .item-img img{
        width:80px;
        height:100px;
        border-radius:5px;
    }
    .item-info{
        font-size:17px;
        color:#333;
        overflow:hidden;
        padding:5px 10px;
        position:relative;
    }
    .item-desc,.item-title{
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .item-desc{
        color:#666;
        margin-top:15px;
        font-size:14px;
    }
    .item-count{
        text-align:right
    }
    .item-bottom{
        position:absolute;
        left:10px;
        right:10px;
        bottom:10px
    }
    .item-price{
        color:orangered
    }
</style>