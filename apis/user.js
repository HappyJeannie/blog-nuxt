import {request} from '@/plugins/request.js'

export const login = data => {
  return request({
    method: 'POST',
    url: '/api/users/login',
    data
  })
}

export const register = data => {
  return request({
    method: 'POST',
    url: '/api/users',
    data
  })
}

// 获取个人信息
export const getProfile = username => {
  return request({
    method: 'GET',
    url: `/api/profiles/${username}`
  })
}

// follow user
export const followUser = username => {
  return request({
    method: 'POST',
    url: `/api/profiles/${username}/follow`
  })
}

// unfollow user
export const unFollowUser = username => {
  return request({
    method: 'DELETE',
    url: `/api/profiles/${username}/follow`
  })
}

// get Current User
export const getCurrentUser = () => {
  return request({
    method: 'GET',
    url: `/api/user`
  })
}

// update Current User
export const updateCurrentUser = data => {
  return request({
    method: 'PUT',
    url: `/api/user`,
    data
  })
}
