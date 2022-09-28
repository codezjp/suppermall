<template>
  <div id="home">
      <!-- 导航栏 -->
      <nav-bar class="home-nav-bar">
        <div slot="center">购物商城</div>
      </nav-bar>
      <!-- 隐藏Tab菜单栏 -->
      <tab-control
            @tabItemClick="tabControlClick"
            class="tabcontorl" 
            ref="topTab"
            v-show="isShowTopBar"
            :titles="['流行1','新款','精选']">
      </tab-control>
      <mall-b-scroll 
        :probe-type="3"
        :pull-up-load="true"
        @pullingUp="loadMore"
        @contentScroll="contentScroll"
        class="home-scrollContent" ref="bsScroll">
          <!-- 轮播图 -->
          <home-swiper class="home-swiper" :banners="banners"/>

          <!-- 产品推荐 -->
          <home-recommend :recommends="recommends"/>

          <!-- 流行风格 -->
          <home-feature/>
          <!-- Tab菜单栏 -->
          <tab-control ref="contentTab"
            @tabItemClick="tabControlClick"
            class="tabcontorl" 
            v-show="!isShowTopBar"
            :titles="['流行2','新款','精选']">
          </tab-control>
          
          <!-- 商品展示区域-->
          <goods-list :goodsList="showGoods"/> 
          
      </mall-b-scroll>
      <back-top @click.native="goBackTop" v-show="isShowBackTop"/>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar"
  import HomeSwiper from "./childComp/HomeSwiper"
  import HomeRecommend from "./childComp/HomeRecommend"
  import HomeFeature from "./childComp/HomeFeature"
  import TabControl from "components/content/tabControl/TabControl"
  import GoodsList from "components/content/goods/GoodsList"
  import MallBScroll from "components/content/scroll/MallBScroll"
 
  //导入首页数据处理
  import {getHomeMultiData,getHomeGoodsList} from "network/home"
  //导入需要混入的逻辑
  import {backTopMixin} from "common/mixin";
  import {debounce} from "common/utils"

  export default {
    name: "Home",
    data(){
      return {
        banners:[],
        recommends:[],
        goods:{
           pop: {page:1,list:[]},
           new: {page:1,list:[]},
           sell:{page:1,list:[]}
        },
        currentType:"pop" ,//当前商品类别
        isShowTopBar:false,   //是否显示吸顶Tab
        tabControlDis:0 ,       //tab菜单到顶部的距离
        listenerImgLoad:null,   //监听的总线事件
      }
    },
    computed:{
      showGoods(){
        return this.goods[this.currentType].list
      }
    },
    components:{
      NavBar,
      HomeSwiper,
      HomeRecommend,
      HomeFeature,
      TabControl,
      GoodsList,
      MallBScroll
    },
    mixins:[backTopMixin],
    created(){
      //获取首页头部数据（轮播图 推荐商品）
      this.getHomeMultiData();

      //根据类别和页码获取商品数据
      this.getHomeGoodsByType("pop");    
      this.getHomeGoodsByType("new");
      this.getHomeGoodsByType("sell");
    },
    activated(){
       let listern = ()=>{
            console.log("加载成功");
            //刷新滚动插件
            this.$refs.bsScroll&&this.$refs.bsScroll.refresh();
            //获取Tab导航菜单到顶部的距离
            this.tabControlDis= this.$refs.contentTab.$el.offsetTop;
            
        };
        this.listenerImgLoad = debounce(listern,200);
        this.$bus.$on("itemImgLoaded", this.listenerImgLoad);
    },
    deactivated(){
       this.$bus.$off("itemImgLoaded",this.listenerImgLoad);
    },
    methods:{
        //监听滚动事件
        contentScroll(position){
             this.isShowBackTop =  position.y<=-1000;
             //判断是否滚动到tab菜单栏的位置
             if( this.tabControlDis-44<= -position.y){
                this.isShowTopBar =true;
             }
             else{
                this.isShowTopBar =false;
             }
        },
        //加载更多
        loadMore(){
            //加载当前类别商品的更多数据
            this.getHomeGoodsByType(this.currentType); 

            //通知滚动到底部数据加载完毕
            //bsScroll为子组件的ref
            //finishPullUp是组件中封装的函数名称 用于通知下次加载更多
            this.$refs.bsScroll&&this.$refs.bsScroll.finishPullUp();
        },
        //商品tab切换
        tabControlClick(index){
       
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

          this.$refs.contentTab.currentIndex =index;
          this.$refs.topTab.currentIndex =index;
        },
       //获取首页头部数据
       getHomeMultiData(){
          getHomeMultiData().then(res=>{
              //轮播图
              this.banners = res.data.banner.list;
              //推荐
              this.recommends=res.data.recommend.list
          });
       },
       //根据类别加载商品数据
       getHomeGoodsByType(type){
            //获取页码
            let pageNum =this.goods[type].page
            //根据类别和页码进行网络请求
            getHomeGoodsList(type,pageNum).then(res=>{
              //获取数据后 修改对应类别商品数据
            
              this.goods[type].list.push(...res.data.list)  ;
             
              //页码加一 下次请求
              this.goods[type].page++;
           });

       }
    }
  }
</script>

<style scoped>
  #home{
    position:relative;
    height:100vh /*视口高度 也就是屏幕高度 */
  }
  .home-nav-bar{
    background-color: var(--color-tint);
    color:#fff;
   
  }
 
  /* .home-scrollContent{
    overflow: hidden;
    position:absolute;
    top:44px;
    bottom:49px;
    left:0px;
    right:0px;
    
  }  */
  .home-scrollContent{
    height:calc(100% - 93px);
    overflow: hidden;
    
  }
</style>
