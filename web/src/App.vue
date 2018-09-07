<template>
  <div id="app">
    <!-- <v-header/> -->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
    'v-header': () => import('@/components/header')
  }
}
</script>

<style lang="scss">
  @import 'assets/css/common.scss';
</style>
