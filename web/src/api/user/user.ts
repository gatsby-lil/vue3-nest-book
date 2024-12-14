import baseCustomRequest from '@/services'
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
  // 新增用户
  createUser(createUser: any, config?: any) {
    return baseCustomRequest.post({
      url: '/user/create',
      data: createUser,
      ...config,
    })
  },

  // 删除用户
  deleteUser(id: number, config?: any) {
    return baseCustomRequest.delete({
      url: `/user/delete/${id}`,
      ...config,
    })
  },
}
