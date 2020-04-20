import {
  requestl,
  request
} from './network.js';

export function loggedUserInfo(data) {
  return requestl({
    url: '/api/loggedUserInfo',
    data: data
  })
}