<template>
    <div class="comment-info" v-if="Object.keys(comment).length>0">
        <div class="info-head">
            <div class="info-head-title">
                用户评价
            </div>
            <div class="info-head-more">
                更多
            </div>
        </div>
        <div class="info-user">
            <img :src="comment.user.avatar" />
            <span>{{comment.user.uname}}</span>
        </div>
        <div class="info-content">
            <p>{{comment.content}}</p>
            <div class="date">
                <span>{{comment.created|dateFormatter}} </span>
                <span class="style">{{comment.style}}</span> 
            </div>
            <div class="info-images">
                <img :src="item" v-for="(item,index) in comment.images" :key="index"/>
            </div>
        </div>
    </div>
</template>

<script>
    import {formatDate} from "common/utils"
    export default {
        props:{
            comment:{
                type:Object
            }
        
        },
        filters:{
                dateFormatter(d){
                    //let n = new Date(2022,9,20);
                    let n = new Date(d*1000);
                    return formatDate(n,"yyyy-MM-dd")
                }
        }
}
</script>

<style scoped>
    .comment-info{
        padding:5px 12px;
        color:#333;
        border-bottom:5px solid  #f2f5f8
    }
    .info-head{
        height:50px;
        line-height:50px;
        border-bottom:1px solid rgba(0,0,0,.1)
    }
    .info-head-title{
        float:left;
        font-size:15px;
    }
    .info-head-more{
        float:right;
        font-size:13px
    }
    .info-user{
        display:flex;
        align-items: center;
        margin-top:10px;
    }
    .info-user img{
        width:45px;
        height:45px;
        border-radius:50%
    }
    .info-user span{
        font-size:15px;
        margin-left:10px
    }
    .info-content{
        padding:5px 0px 15px
    }
    .info-content>p{
        font-size:14px;
        color:#777;
        line-height:1.5;
    }
    .info-content .date{
        color:#999;
        font-size:12px
    }
    .info-content .style{
        margin-left:10px
    }
    .info-images{
        margin-top:10px;
    }
    .info-images>img{
        width:70px;
        height:70px;
        margin-right:5px;
    }
</style>