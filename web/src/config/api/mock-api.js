import axios from '@/config/api/http'
import cache from '@/config/cache'
// 表示跨域请求时是否需要使用凭证
axios.defaults.withCredentials = true
// 超时时间20s
axios.defaults.timeout = 20000

const apiSrv = 'http://192.168.1.226:3001'

/**
 * @author 秦超
 * @returns exam List
 */
export const getExams = async (id) => {
  const res = await axios.get(`${apiSrv}/exams/${id}`, {
    adapter: cache({
      local: true
    })
  })
  return res.data
}

