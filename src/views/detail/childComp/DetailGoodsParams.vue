<template>
    <div class="params-info" v-if="Object.keys(itemParams).length>0">
        <table>
            <tr v-for="(item,index) in itemParams.sizes" :key="index">
                <td v-for="(v,i) in item" :key="i">{{v}}</td>
            </tr>
        </table>
        <table>
            <tr v-for="(item,index) in itemParams.info" :key="index">
                <td class="item-key">{{item.key}}</td>
                <td class="item-value">{{item.value}}</td>
            </tr>
        </table>
    </div>
</template>

<script>
export default {
    props:{
        itemParams:{
            type:Object
        }
    }
}
</script>

<style scoped>
    .params-info{
        padding:20px 15px;
        border-bottom: 5px solid #f2f5f8;
        font-size:14px
    }
    .params-info table{
        width:100%;
        border-collapse: collapse
    }
    .params-info table tr {
        height: 42px;
    }

  .params-info table tr td {
    border-bottom: 1px solid rgba(100,100,100,.1);
  }
  .item-key{
    width:95px;
  }
  .item-value{
    color: #eb4868;
  }
</style>