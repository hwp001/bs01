import {
  requestl,
  request
} from './network.js';

export function addOrder(data){
 return request({
    url: '/api/addOrder',
    data: data
  })
}

export function getOrder(data) {
  return request({
    url: '/api/getOrder',
    data: data
  })
}

export function getOrderById(data) {
  return request({
    url: '/api/getOrderById',
    data: data
  })
}

export function cancelOrder(data) {
  return request({
    url: '/api/cancelOrder',
    data: data
  })
}

export function recoverOrder(data) {
  return request({
    url: '/api/recoverOrder',
    data: data
  })
}

export function signOrder(data) {
  return request({
    url: '/api/signOrder',
    data: data
  })
}

export function addComment(data) {
  return request({
    url: '/api/addComment',
    data: data
  })
}