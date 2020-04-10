import request from './network.js';
export function getDetail(data)
{
  return request({
    url: '/api/getComment',
    data: data
  });
}

export class GoodsBaseInfo {
  constructor(itemInfo) {
    this.title = itemInfo.title
    this.desc = itemInfo.description
    this.price = itemInfo.price
    this.count = itemInfo.count
  }
}