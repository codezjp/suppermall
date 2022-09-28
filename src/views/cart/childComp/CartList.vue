<template>
  <div class="cart-list">
        <cart-list-item 
        :product="item"
        v-for="(item,index) in cartList" 
        :key="index"/>
  </div>
</template>

<script>
    import CartListItem from "./CartListItem"
    export default {
        components:{
            CartListItem
        },
        props:{
            cartList:{
                type:Array,
                default(){
                    return []
                }
            }
        }
    }
</script>

<style>

</style>