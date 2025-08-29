import baseCustomRequest from '@/services'

export default {
  sendQuestion(data: any, config?: any) {
    return baseCustomRequest.get({
      url: `http://localhost:3000/stream?question=${data}`,
      // data,
      ...config,
    })
  },
}