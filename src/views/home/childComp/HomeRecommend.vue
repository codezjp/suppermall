<template>
    <div class="recommend">
          <div class="recommend-item" v-for="(item,index) in recommends" :key="index">
            <a :href="item.link">
              <img :src="item.image"/>
              <p>{{item.title}}</p>
            </a>
            
          </div>
      </div>
</template>

<script>
export default {
    props:{
        recommends:{
            type:Array,
            default(){
                return [];
            }
        }
    }
}
</script>

<style>
 .recommend{
    display: flex;
    text-align: center;
    margin-top: 10px;
    font-size: 14px;
    padding-bottom:10px;
    border-bottom:10px solid #ebebeb
  }
  .recommend-item{
    flex:1
  }
  .recommend-item img{
    width:70px;
    height: 70px;
  }
</style>