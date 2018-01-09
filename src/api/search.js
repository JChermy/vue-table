import request from '@/utils/request'

export function search(type, keyword) {
  return request({
    url: '/search',
    method: 'get',
    params: { type, keyword }
  })
}
