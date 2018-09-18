import cache from '@/config/cache'
import axios from '@/config/api/http'

const apiSrv = process.env.NODE_ENV === 'development' ? '//exam.cpsdb61.com/' : '//exam.cpsdb.com/'

/**
 * @author 秦超
 * @returns 获取答卷
 */
export const getExams = async (id) => {
  const res = await axios.get(`${apiSrv}exams/declareexamination/allsubjects/${id}`, {
    // adapter: cache({
    //   local: true
    // })
  })
  return res.data.data
}

/**
 * @author 秦超
 * @returns 提交答卷
 */
export const postAnswer = async (params) => {
  const res = await axios.post(`${apiSrv}/exams/declareexamination/submission`, params)
  return res.data.data
}
