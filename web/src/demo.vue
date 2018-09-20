<template>
  <div></div>
</template>

<script>
export default {
  name: 'demo',
  props: {
    value: {
      type: String
    }
  },
  data () {
    return {}
  },
  computed: {},
  methods: {},
  watch: {},
  components: {
    'qc-input': () => import('@/components/input')
  },
  beforeCreate () {
  },
  cteated () {
  },
  beforeMount () {
  },
  mounted () {
  },
  beforeUpdate () {
  },
  updated () {
  },
  beforeDestroy () {
  },
  destroyed () {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style type="text/css" lang="scss" scoped>
  @import 'index.scss'
</style>
