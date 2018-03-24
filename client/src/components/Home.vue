<template>
  <div class="home">
    <v-header></v-header>
    <div class="menu">
      <v-slide-menu></v-slide-menu>
    </div>
    <div class="content">
      <transition name="move" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>

  </div>
</template>

<script>
  import vHeader from './Header'
  import vSlideMenu from './SlideMenu'
  export default {
    name: 'home',
    data () {
      return {

      }
    },
    components: {
      vSlideMenu, vHeader
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  @import "../style/css/font-awesome.min.css";
  @import "../style/css/font.css";
  .content{
    margin-left: 150px;
  }
  .menu{
    height: 100%;
  }
</style>
