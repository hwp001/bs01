import {
    requestl,
    request
  } from './network.js';
  
  export function editUserInfo(data) {
    return requestl({
      url: '/api/editUserInfo',
      data: data
    })
  }