import baseCustomRequest from '@/services'

// import axios from 'axios'
// const axiosInstance = axios.create({
//   baseURL: 'http://localhost:3000',
// })

// const createUser = async (createUser: any) => {
//   const result = await axiosInstance.post('/user/create', createUser)
//   return result
// }

// const deleteUser = async (fileName: string, config?: any) => {
//   const result = await axiosInstance.get(`/upload/file/merge/${fileName}`, {
//     cancelToken: config?.cancelToken?.token,
//   })
//   return result
// }

// const addUser = async (fileName: string, config?: any) => {
//   const result = await axiosInstance.get(`/upload/file/verity/${fileName}`, {
//     cancelToken: config?.cancelToken?.token,
//   })
//   return result
// }

// const findUser = async (fileName: string, config?: any) => {
//   const result = await axiosInstance.get(`/upload/file/verity/${fileName}`, {
//     cancelToken: config?.cancelToken?.token,
//   })
//   return result
// }

// export { createUser, deleteUser, addUser, findUser }

export default {
  createUser(createUser: any, config?: any) {
    return baseCustomRequest.get({
      url: '/user/create',
      data: createUser,
      ...config,
    })
  },
}
