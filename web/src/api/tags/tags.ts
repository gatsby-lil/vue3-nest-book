import baseCustomRequest from '@/services'

export default {
  getTags(config?: any) {
    return baseCustomRequest.get({
      url: `/tag/list`,
      ...config,
    })
  },
}
