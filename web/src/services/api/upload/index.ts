import axios from 'axios'
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
})

const fileUpload = async (uploadChunk: FormData, config?: any) => {
  const result = await axiosInstance.post('/upload/fileChunkUpload', uploadChunk, {
    cancelToken: config?.cancelToken?.token,
  })
  return result
}

const mergeFile = async (fileName: string, config?: any) => {
  const result = await axiosInstance.get(`/upload/file/merge/${fileName}`, {
    cancelToken: config?.cancelToken?.token,
  })
  return result
}

const vertifyExistFile = async (fileName: string, config?: any) => {
  const result = await axiosInstance.get(`/upload/file/verity/${fileName}`, {
    cancelToken: config?.cancelToken?.token,
  })
  return result
}

export { fileUpload, mergeFile, vertifyExistFile }
