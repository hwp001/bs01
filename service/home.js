import {
  request
  } from './network.js';

export function getHomeData()
{
  return request({
    url: '/api/home'
  });
}

export function getData()
{
  return request({
    url: '/api/multiData'
  });
}
export function searchGood(data) {
  return request({
    url: '/api/searchGood',
    data: data
  })
}