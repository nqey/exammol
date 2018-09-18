import axios from '@/config/api/http'

// const apiSrv = process.env.NODE_ENV === 'development' ? '//dec.cpsdb61.com/' : '//dec.cpsdb.com/'
const env = (() => {
  if (/cpsdb61.com/.test(window.location.hostname)) {
    return 'test'
  } else if (/cpsdb.com/.test(window.location.hostname)) {
    return 'online'
  }
  return 'local'
})()

const apiSrv = {
  test: '//dec.cpsdb61.com/',
  online: '//dec.cpsdb.com/',
  local: location.hostname
}[env]

/**
 * @author 秦超
 * @returns login
 */
export const doLogin = async (id) => {
  const res = await axios.get(`${apiSrv}publics/examinee/login`)
  return res.data.data
}

/**
 * @author 秦超
 * @returns 获取用户信息
 */
export const getUserInfo = async (id) => {
  const res = await axios.get(`${apiSrv}/declarerapp/declarer/get/examination`)
  return res.data.data
}
