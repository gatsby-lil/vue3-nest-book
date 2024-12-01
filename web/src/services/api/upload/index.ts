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
  const result = await axiosInstance.get(`/upload/file/merge/${fileName}?xxx=123`, {
    cancelToken: config?.cancelToken?.token,
  })
  return result
}

export { fileUpload, mergeFile }
