import baseCustomRequest from '@/services'

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

  // 修改用户
  updateUser(data: any, config?: any) {
    return baseCustomRequest.put({
      url: '/user/update',
      data: data,
      ...config,
    })
  },

  // 查询用户
  getUserList(data: any, config?: any) {
    return baseCustomRequest.post({
      url: '/user/list',
      data,
      ...config,
    })
  },

  getUserById(id: number, config?: any) {
    return baseCustomRequest.get({
      url: `/user/getuser/${id}`,
      ...config,
    })
  }
  
}
