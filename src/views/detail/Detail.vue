<template>
    <div class="detail"> 

        <detail-nav-bar @navClick="navClick" :current-index="currentThemeIndex"/>
        <mall-b-scroll 
                :probe-type="3"
                @contentScroll="contentScroll"
                class="scrollContent" ref="bsScroll">
                
                <detail-swiper class="detail-swiper" :images="topImages"/>
                <detail-base-info :goods="baseGoods"/>
                <detail-shop-info :shop="shop"/>
                <detail-goods-info :detailInfo="detailInfo"/>
                <detail-goods-params ref="param" :itemParams="shopParams"/>
                <detail-comment ref="comment" :comment="commentInfo"/>
                <goods-list ref="recommend" :goodsList="recommends"/> 

        </mall-b-scroll>    
        <detail-bottom-bar @addToCart="addToCart" />
        <back-top @click.native="goBackTop" v-show="isShowBackTop"/>
        <toast ref="toast" :message="message" :waitSeconds="2000" :isShow="showToast"/>
    </div>
  
</template>

<script>
    import DetailNavBar from './childComp/DetailNavBar';
    import DetailSwiper from './childComp/DetailSwiper';
    import DetailBaseInfo from './childComp/DetailBaseInfo';
    import DetailShopInfo from './childComp/DetailShopInfo';
    import DetailGoodsInfo from './childComp/DetailGoodsInfo';
    import DetailGoodsParams from './childComp/DetailGoodsParams';
    import DetailComment from './childComp/DetailComment';
    import DetailBottomBar from './childComp/DetailBottomBar';
    import GoodsList from "components/content/goods/GoodsList"
    import MallBScroll from "components/content/scroll/MallBScroll"
    import Toast from "components/content/toast/Toast"
    
    import {getGoodsDetail,getRecommend} from "network/detail"
    import {Goods,Shop,ShopParams} from "common/models"
    import {backTopMixin} from "common/mixin"
    import {debounce} from "common/utils"

    import {mapActions} from 'vuex'
    
export default {
    name:"Detail",
    components:{
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        DetailGoodsInfo,
        DetailGoodsParams,
        DetailComment,
        DetailBottomBar,
        GoodsList,
        MallBScroll,
        Toast
    },
    data(){
        return {
            iid:"",
            topImages:[],
            baseGoods:{},
            shop:{},
            detailInfo:{},
            shopParams:{},
            commentInfo:{},
            recommends:[],
            listenerImgLoad:null,   //监听的总线事件
            themeOffsetTopArr:[],   //每个主题的offsetTop
            currentThemeIndex:0,     //当前主题序号
            showToast:false,
            message:""
        }
    },
    mixins:[backTopMixin],
    methods:{
        ...mapActions({
            "addCart":"addToCart"
        }),
        addToCart(){
            //获取商品数据
            let product ={
                iid:this.baseGoods.iid,
                title:this.baseGoods.title,
                desc:this.baseGoods.desc,
                price:this.baseGoods.realPrice,
                image:this.topImages[0]
            }
            //添加产品到购物车
            //增加新商品 增加数量
             //this.$store.dispatch("addToCart",product);
            this.addCart(product).then(res=>{
                this.message=res;
                this.$refs.toast.show();
                //关闭提示
                this.$refs.toast.close();
            });
        },
        navClick(index){
            //根据序号 获取对应区域的滚动距离
            let pos = this.themeOffsetTopArr[index];
            //滚动
            this.$refs.bsScroll&&this.$refs.bsScroll.scrollTo(0,pos,400);

        },
        contentScroll(position){
            this.isShowBackTop =  position.y<=-1000;
            //获取滚动距离
            let iPos = position.y;
            //循环判断主题                               
            for(let i=0;i<this.themeOffsetTopArr.length;i++){
                //获取相邻的两个offsetTop
                let star=this.themeOffsetTopArr[i];
                let end= this.themeOffsetTopArr[i+1];
                //判断是否在该区间
                if(iPos<=star&&iPos>end){
                    this.currentThemeIndex = i;
                    break;
                }
            }
        }
    },
    created(){
       
        this.iid=this.$route.query.iid;
       
        //根据商品编号 调用Api获取商品详情
        getGoodsDetail(this.iid).then(res=>{
            let result = res.result;
            console.log(result)
            this.topImages = result.itemInfo.topImages;
            //商品基础信息
            this.baseGoods = new Goods( result.itemInfo, result.shopInfo,result.columns);
            //店铺信息
            this.shop = new Shop(result.shopInfo);
           
            //商品详情
            this.detailInfo = result.detailInfo;
            //商品参数
            this.shopParams = new ShopParams(result.itemParams.info,result.itemParams.rule);
            //商品评论
            this.commentInfo =result.rate.list? result.rate.list[0]:{};
        })

        //获取推荐商品
        getRecommend().then(res=>{
            this.recommends =res.data.list;
        });

        //定义总结执行过程 并监听总线发生的事件itemImgLoaded
        let listern = ()=>{
            //1 刷新滚动插件
            this.$refs.bsScroll&&this.$refs.bsScroll.refresh&&this.$refs.bsScroll.refresh();

            //2 获取各个区域的offsetTop
            this.themeOffsetTopArr=[];
            this.themeOffsetTopArr.push(0);
            this.themeOffsetTopArr.push(-this.$refs.param.$el.offsetTop+44);
            this.themeOffsetTopArr.push(-this.$refs.comment.$el.offsetTop+44);
            this.themeOffsetTopArr.push(-this.$refs.recommend.$el.offsetTop+44);
            this.themeOffsetTopArr.push(-Number.MAX_VALUE);
        };
        this.listenerImgLoad= debounce(listern,200);
        this.$bus.$on("itemImgLoaded",this.listenerImgLoad);
    },
    destroyed(){
        //组件被销毁 不再监听总线事件
        this.$bus.$off("itemImgLoaded",this.listenerImgLoad)
    }

}
</script>

<style scoped>
    .detail{
        height: 100vh;
    }
    .detail-swiper{
        height:300px;
    }
   .scrollContent{
    height:calc(100% - 93px);
    overflow: hidden;
    
  }
</style>