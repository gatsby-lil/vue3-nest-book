import baseCustomRequest from '@/services'

export default {
  createBook(createBookInfo: any, config?:any) {
    return baseCustomRequest.post({
      url: `/book/create`,
      data: createBookInfo,
      ...config,
    })
  },

  getBookList(queryData: any, config?: any) {
    return baseCustomRequest.post({
      url: `/book/list`,
      data: queryData,
      ...config,
    })
  }
}
