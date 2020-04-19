import {
  requestl,
  request
} from './network.js';

export function getCommentById(data) {
  return request({
    url: '/api/getCommentById',
    data: data
  })
}