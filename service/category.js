import {
  request
} from './network.js';

export function getGoodCategory(){
  return request({
    url: '/api/category'
  })
}