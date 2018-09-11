<template>
  <div class="exam" ref="exam">
    <header class="exam-head">
        <span class="icon-list2" @touchstart="toggle"></span>
        <span class="time">{{countdown}}</span>
        <span class="num">{{index + 1}}/{{page}}</span>
    </header>
    <nav class="exam-nav" v-show="open">
      <ul>
        <li v-for="(exam, i) in exams" :key="'ject' + i">
          <input type="radio" name="nav" :value="i" :id="'nav' + i">
          <label :for="'nav' + i" @touchstart="select(i)" :class="{ success: exam.answer.length > 0  }">{{i+1}}</label>
        </li>
      </ul>
    </nav>
    <section class="exam-body" v-if="exam" v-show="!open">
      <h4>({{title}})</h4>
      <p>{{index + 1}}、{{exam.title}}</p>
      <ul class="exam-list">
        <li v-for="(ject, i) of exam.content" :key="'ject' + i">
          <input :type="selType" name="ject" :value="i" :id="'ject' + i" v-model="exam.answer">
          <label :for="'ject' + i"><span>{{ject.option}}</span></label>
        </li>
      </ul>
      <textarea resize="none" cols="30" rows="10" v-show="isEssay" v-model="exam.answer"></textarea>
      <input v-show="isFill" class="easy" v-model="exam.answer"/>
    </section>
    <footer class="exam-foot">
      <qc-button type="submit" @touchstart.native="submit" v-show="isShow">提交答卷</qc-button>
      <qc-button type="next" @touchstart.native="preIndex">上一题</qc-button>
      <span>|</span>
      <qc-button type="next" @touchstart.native="nextIndex">下一题</qc-button>
    </footer>
  </div>
</template>

<script>
import { getExamList } from '@/config/api'
import { prefixInteger, getArrLen, getArr, touch } from '@/config/utils'

export default {
  name: 'index',
  data () {
    return {
      obj: null,
      exams: [],
      index: 0,
      totalsecond: 0,
      interval: null,
      open: false,
      mapping: {
        'single': '单选题',
        'multiple': '多选题',
        'judge': '判断题',
        'essay': '简答题',
        'fill': '填空题'
      },
      mappingSel: {
        'single': 'radio',
        'judge': 'radio',
        'multiple': 'checkbox'
      },
      mappingABC: {
        '0': 'A',
        '1': 'B',
        '2': 'C',
        '3': 'D',
        '4': 'E'
      }
    }
  },
  components: {
    'qc-input': () => import('@/components/input'),
    'qc-button': () => import('@/components/button')
  },
  computed: {
    countdown () {
      if (this.totalsecond <= 0) {
        clearInterval(this.interval)
        // this.submit()
      }
      // 剩余小时
      const remainhour = prefixInteger(Math.floor(this.totalsecond / 3600))
      // 剩余分钟
      const remainminite = prefixInteger(Math.floor((this.totalsecond - 3600 * remainhour) / 60))
      // 剩余秒数
      const remainsecond = prefixInteger(Math.floor(this.totalsecond - 3600 * remainhour - 60 * remainminite))
      return `${remainhour}:${remainminite}:${remainsecond}`
    },
    page () {
      return getArrLen(this.exams)
    },
    exam () {
      return this.exams[this.index]
    },
    title () {
      return this.mapping[this.exam.subjectType || '']
    },
    isShow () {
      return getArrLen(this.exams) === this.index + 1
    },
    isFill () {
      return this.exams[this.index].subjectType === 'fill'
    },
    isEssay () {
      return this.exams[this.index].subjectType === 'essay'
    },
    selType () {
      return this.mappingSel[this.exams[this.index].subjectType]
    }
  },
  methods: {
    async init () {
      this.obj = await getExamList(this.$route.params.id)
      const jects = this.obj.subjectsMap
      this.exams = [].concat(getArr(jects.single))
        .concat(getArr(jects.multiple))
        .concat(getArr(jects.judge))
        .concat(getArr(jects.fill))
        .concat(getArr(jects.essay))
        .map(o => {
          o.answer = ''
          if (!o.content) return o
          o.content = JSON.parse(o.content)
          if (o.subjectType === 'multiple') o.answer = []
          return o
        })
      // if (new Date().getTime() > this.obj.submitTime) return
      this.totalsecond = Math.floor((this.obj.submitTime - this.obj.beginTime) / 1000)
      this.interval = setInterval(() => { this.totalsecond -= 1 }, 1000)
    },
    preIndex () {
      this.index -= 1
      if (this.index < 0) this.index = this.page - 1
    },
    nextIndex () {
      this.index += 1
      if (this.index >= this.page) this.index = 0
    },
    submit () {
      // TODO
      const noAnswers = this.exams.map((o, i) => {
        if (o.answer.length === 0) return i + 1
      }).filter(o => o !== undefined)
      const message = noAnswers.length ? `${noAnswers.join('题、')}题 未完成` : '答题完成'
      this.$popup.show({
        title: '答案',
        message,
        submit: () => {}
      })
      window.console.log('提交试卷成功！！！', this.exams, noAnswers)
    },
    toggle () {
      this.open = !this.open
    },
    select (i) {
      this.index = i
      setTimeout(this.toggle, 300)
    }
  },
  mounted () {
    this.init()
    touch({
      left2right: this.preIndex,
      right2left: this.nextIndex
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style type="text/css" lang="scss" scoped>
  @import 'index.scss'
</style>
