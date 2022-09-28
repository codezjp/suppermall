<template>
    <div class="car-inf">
        <nav-bar class="nav-bar">
            <div slot="center">购物车({{cartLength}})</div>
        </nav-bar>
        <mall-b-scroll ref="scroll" class="cart-scroll">
          
          <cart-list :cart-list="cartList"/>
        </mall-b-scroll>
        <cart-bottom-bar />
    </div>
</template>

<script>
  import {mapGetters} from "vuex"
  import NavBar from "components/common/navbar/NavBar"
  import CartList from "./childComp/CartList"
  import CartBottomBar from "./childComp/CartBottomBar"
  import MallBScroll from "components/content/scroll/MallBScroll"
  export default {
    components:{
      NavBar,
      CartList,
      CartBottomBar,
      MallBScroll
    },
    name: "Cart",
    computed:{
      ...mapGetters(["cartLength","cartList"])
    },
    activated(){
      //刷新滚动组件
      this.$refs.scroll&&this.$refs.scroll.refresh();
    }
  }
</script>

<style scoped>
  .nav-bar{
    background-color: var(--color-tint);
    color:#fff;
    font-weight: 700;
  }
  .cart-scroll{
    position:absolute;
    left:0px;
    right:0px;
    top:44px;
    bottom:93px;
    overflow: hidden;    
  }
</style>
