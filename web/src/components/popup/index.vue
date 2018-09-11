<template>
  <div v-show="show">
      <div class="lodding-mask"></div>
      <div id="popup-dialog" class="popup-dialog">
        <h3 id="popup-dialog-title">{{title}}</h3>
        <p id="popup-dialog-msg" class="message">{{message}}</p>
        <div class="ui-grid-a group">
          <div class="ui-block-a" @touchstart="submit">提交答卷</div>
          <div class="ui-block-b" @touchstart="close">继续做题</div>
        </div>
      </div>
  </div>
</template>

<script>

export default {
  name: 'qc-popup',
  props: {
    title: {
      type: String,
      default: null
    },
    message: {
      type: String,
      default: null
    },
    submit: {
      type: Function,
      default: () => {}
    }
  },
  data () {
    return {
      show: false
    }
  },
  methods: {
    open () {
      this.show = true
    },
    close () {
      this.show = false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style type="text/css" lang="scss" scoped>
   @import 'index.scss';
</style>
