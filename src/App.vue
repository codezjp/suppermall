<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view/>
    </keep-alive>
   
    <mall-tab-bar/>
  </div>
</template>

<script>
import MallTabBar from "components/content/mallTabBar/MallTabBar"

export default {
  name: 'App',
  components: {
    MallTabBar
  }
}
</script>

<style>
/* 导入标准化样式 */
@import url(~assets/css/base.css);

</style>
