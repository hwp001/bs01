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