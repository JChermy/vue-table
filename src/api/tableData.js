import request from '@/utils/request'

export function getTableData(key) {
  return request({
    url: key + '/getTableData',
    method: 'get'
  })
}

export function saveTableData(key, data) {
  return request({
    url: key + '/saveTableData',
    method: 'post',
    data
  })
}
