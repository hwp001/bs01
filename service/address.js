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

export function updateCargo(data) {
  return request({
    url: '/api/updateCargo',
    data: data
  })
}

export function getCargoById(data) {
  return request({
    url: '/api/getCargoById',
    data: data
  })
}

export function updateCargoById(data) {
  return request({
    url: '/api/updateCargoById',
    data: data
  })
}