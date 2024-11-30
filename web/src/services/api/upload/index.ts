import axios from 'axios'
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
})

const fileUpload = async (uploadChunk: FormData, config?: any) => {
  const res = await axiosInstance.post('/upload/fileChunkUpload', uploadChunk, {
    cancelToken: config?.cancelToken?.token,
  })
  console.log(res, 'res')
  return res
}

export { fileUpload }
