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
            listenerImgLoad:null,   //?????????????????????
            themeOffsetTopArr:[],   //???????????????offsetTop
            currentThemeIndex:0,     //??????????????????
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
            //??????????????????
            let product ={
                iid:this.baseGoods.iid,
                title:this.baseGoods.title,
                desc:this.baseGoods.desc,
                price:this.baseGoods.realPrice,
                image:this.topImages[0]
            }
            //????????????????????????
            //??????????????? ????????????
             //this.$store.dispatch("addToCart",product);
            this.addCart(product).then(res=>{
                this.message=res;
                this.$refs.toast.show();
                //????????????
                this.$refs.toast.close();
            });
        },
        navClick(index){
            //???????????? ?????????????????????????????????
            let pos = this.themeOffsetTopArr[index];
            //??????
            this.$refs.bsScroll&&this.$refs.bsScroll.scrollTo(0,pos,400);

        },
        contentScroll(position){
            this.isShowBackTop =  position.y<=-1000;
            //??????????????????
            let iPos = position.y;
            //??????????????????                               
            for(let i=0;i<this.themeOffsetTopArr.length;i++){
                //?????????????????????offsetTop
                let star=this.themeOffsetTopArr[i];
                let end= this.themeOffsetTopArr[i+1];
                //????????????????????????
                if(iPos<=star&&iPos>end){
                    this.currentThemeIndex = i;
                    break;
                }
            }
        }
    },
    created(){
       
        this.iid=this.$route.query.iid;
       
        //?????????????????? ??????Api??????????????????
        getGoodsDetail(this.iid).then(res=>{
            let result = res.result;
            console.log(result)
            this.topImages = result.itemInfo.topImages;
            //??????????????????
            this.baseGoods = new Goods( result.itemInfo, result.shopInfo,result.columns);
            //????????????
            this.shop = new Shop(result.shopInfo);
           
            //????????????
            this.detailInfo = result.detailInfo;
            //????????????
            this.shopParams = new ShopParams(result.itemParams.info,result.itemParams.rule);
            //????????????
            this.commentInfo =result.rate.list? result.rate.list[0]:{};
        })

        //??????????????????
        getRecommend().then(res=>{
            this.recommends =res.data.list;
        });

        //???????????????????????? ??????????????????????????????itemImgLoaded
        let listern = ()=>{
            //1 ??????????????????
            this.$refs.bsScroll&&this.$refs.bsScroll.refresh&&this.$refs.bsScroll.refresh();

            //2 ?????????????????????offsetTop
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
        //??????????????? ????????????????????????
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