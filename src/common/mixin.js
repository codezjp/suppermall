
import BackTop from "components/content/backTop/BackTop"

export const backTopMixin ={
    components:{
        BackTop
    },
    data(){
        return {
            isShowBackTop:false, //是否显示BackTop图标
        }
    },
    methods:{
        //回到顶部
        goBackTop(){
            //滚动到顶部
            this.$refs.bsScroll&&this.$refs.bsScroll.scrollTo(0,0,400);
        },
    }
}