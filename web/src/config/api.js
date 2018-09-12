import axios from 'axios'
import cache from './cache'

const apiSrv = 'http://192.168.1.226:3001'

/**
 * @author 秦超
 * @returns exam List
 */
export const getExamList = async (id) => {
  const res = await axios.get(`${apiSrv}/exams/${id}`, {
    adapter: cache({
      local: true
    })
  })
  return res.data
}

/**
 * @author 秦超
 * @returns exam List
 */
export const getAnswer = async (id) => {
  const res = await axios.get(`${apiSrv}/answer/${id}`, {
    adapter: cache({
      local: true
    })
  })
  return res.data
}
