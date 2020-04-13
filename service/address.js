import request from './network.js';

export function addCargo(data) {
  return request({
    url: '/api/addCargo',
    data: data
  })
}

export function getCargo(data) {
  return request({
    url: '/api/getCargo',
    data: data
  })
}