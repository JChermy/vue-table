import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/shopentrance',
    method: 'get',
    params
  })
}
