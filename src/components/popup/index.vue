<template>
  <div v-show="show">
      <div class="lodding-mask"></div>
      <div id="popup-dialog" class="popup-dialog">
        <h3 id="popup-dialog-title">{{title}}</h3>
        <p id="popup-dialog-msg" class="message">
         <span v-html="message"></span>
        </p>
        <div class="ui-grid-a group" v-show="button">
          <div class="ui-block-a" @touchstart="submit">提交答卷</div>
          <div class="ui-block-b" @touchstart="close($event)">继续做题</div>
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
    button: {
      type: Boolean,
      default: true
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
    open (e) {
      this.show = true
      e.preventDefault()
    },
    close (e) {
      this.show = false
      e.preventDefault()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style type="text/css" lang="scss" scoped>
   @import 'index.scss';
</style>
