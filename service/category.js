import request from './network.js';

export function getGoodCategory(){
  return request({
    url: '/api/category'
  })
}

export function getChildCategory(data){
  return request({
    url: '/api/childCategory',
    data: data
  })
}

export  function getGoodDetail(data){
  return request({
    url: '/api/detail',
    data: data
  })
}

export function getAll() {
  return request({
    url: '/api/all'
  })
}