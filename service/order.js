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