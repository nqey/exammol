import cache from '@/config/cache'
import axios from '@/config/api/http'

const apiSrv = process.env.NODE_ENV === 'development' ? '//exam.cpsdb61.com/' : '//exam.cpsdb.com/'

/**
 * @author 秦超
 * @returns 获取答卷
 */
export const getExams = async (id) => {
  const res = await axios.get(`${apiSrv}exams/declareexamination/app/allsubjects`, {
    // adapter: cache({
    //   local: true
    // })
  })
  return res.data.success ? res.data.data : false
}

/**
 * @author 秦超
 * @returns 提交答卷
 */
export const postAnswer = async (params, self) => {
  const res = await axios.post(`${apiSrv}/exams/declareexamination/submission`, params)
  if (!res.data.success) {
    self.$popup.show({
      title: '提示信息',
      message: `<p style='color: red;padding: 15px;'>${res.data.message}</p>`,
      button: false
    })
  } else {
    let errQS = []
    let scroe = 0;
    [
      res.data.data.single,
      res.data.data.multiple,
      res.data.data.judge,
      res.data.data.fill,
      res.data.data.essay
    ].forEach((o) => {
      errQS = [...errQS, ...o.errorSubjectSortList]
      scroe = scroe + o.score
    })
    self.$popup.show({
      title: '考试提交成功',
      message: `得分<span style="color: #01c853">${scroe}</span>分<hr style="margin:10px 0px"/>错误题号<span style='color: red'>${errQS.sort().join(',')}</span>`,
      button: false
    })
  }
}

/**
 * @author 秦超
 * @returns 提交答卷
 */
// export const getIllustrate = async (params) => {
//   const res = await axios.post(`${apiSrv}/exams/declareexamination/submission`, params)
//   return res.data.data
// }
