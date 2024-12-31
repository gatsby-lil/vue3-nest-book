import baseCustomRequest from '@/services'

export default {
  fileUpload(uploadChunk: FormData, config?: any) {
    return baseCustomRequest.post({
      url: '/upload/fileChunkUpload',
      data: uploadChunk,
      ...config,
    })
  },

  mergeFile(fileName: string, id: number, config?: any) {
    return baseCustomRequest.get({
      url: `/upload/file/merge/${fileName}/${id}`,
      ...config,
    })
  },

  vertifyExistFile(fileName: string, config?: any) {
    return baseCustomRequest.get({
      url: `/upload/file/verity/${fileName}`,
      ...config,
    })
  },
}
