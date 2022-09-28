<template>
    <div id="category">
      <nav-bar class="nav-bar">
            <div slot="center">商品分类</div>
      </nav-bar>
      <div class="content">
          <tab-menu :category="category" @categoryItemClick="categoryClick"/>
          <mall-b-scroll id="tab-content" ref="contentScroll">
              <tab-child-category :childCategory="childCategory"/>

              <tab-control 
              @tabItemClick="tabclick" 
              :titles="['综合', '新品', '销量']"/>

              <goods-list :goodsList="showGoods"/> 
          </mall-b-scroll>
          
      </div>
    </div> 
			
</template>

<script>
  import MallBScroll from "components/content/scroll/MallBScroll"
  import NavBar from "components/common/navbar/NavBar"
  import TabMenu from "./childComp/TabMenu"
  import TabChildCategory from "./childComp/TabChildCategory"
  import TabControl from "components/content/tabControl/TabControl"
  import GoodsList from "components/content/goods/GoodsList"
  import {getAllCategory,getSubcategory,getGoodsByCategory} from "network/category"

  export default {
    name: "Category",
    components:{
      NavBar,
      TabMenu,
      MallBScroll,
      TabControl,
      TabChildCategory,
      GoodsList
    },
    data(){
        return {
            //一级类别
            category:[],
            //二级类别
            childCategory:[],
            //商品tab类别
            currentType:"pop",
            goods:{
              pop: [],
              new: [],
              sell:[]
            }
        }
    },
    computed:{
      showGoods(){
        return this.goods[this.currentType]
      }
    },
    updated(){
            console.log( 1111);
            this.$refs.contentScroll&&this.$refs.contentScroll.refresh();
    },
    created(){
      getAllCategory().then(res=>{
         //保存商品类别
         this.category = res.data.category.list;
         console.log(this.category);
         this.categoryClick(0);
      })
    },
    methods:{
      //tab栏目点击事件
      tabclick(index){
          //根据序号获取商品类别 以便后续进行联合查询商品数据
           //根据序号判断商品类别
           switch(index){
            case 0:
              this.currentType="pop";
              break;
            case 1:
              this.currentType="new";
              break;
            case 2:
              this.currentType="sell";
              break;
            default:
              this.currentType="pop";
              break;
          }
      },
      categoryClick(index){
         console.log(index);
         //获取菜单的maitkey
         let key = this.category[index].maitKey;
         console.log(this.category[index]);
         let miniKey = this.category[index].miniWallkey;
         //根据key查询该类别下的二级栏目
         getSubcategory(key).then(res=>{
              this.childCategory = res.data.list;
         })

         //查询该类别下所有的商品（流行 新款 销量）
         this.getGoodsList(miniKey,"pop");
         this.getGoodsList(miniKey,"sell")
         this.getGoodsList(miniKey,"new")
      },
      getGoodsList(miniKey,type){
          //查询商品
          getGoodsByCategory(miniKey,type).then(res=>{
             this.goods[type]=res;
          })
      }
    }

  }
</script>

<style scoped>
   #category{
     height:100vh;
   }
  .nav-bar{
    z-index:9999;
		background-color:var(--color-tint);
		color:white;
    font-weight:700
  }
  .content {
    position: absolute;
    left: 0;
    right: 0;
    top: 44px;
    bottom: 49px;
    display: flex;
    overflow: hidden;
  }
  #tab-content{
    height:100%;
    flex:1
  }
</style>
