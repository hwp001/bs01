import {
  baseURL
} from './config.js';

export const headURL = baseURL + '/upload/';
export const uploadImg = baseURL + '/api/uploadImg';

//验证手机号码
export function checkPhone(phone){
  var phone = parseInt(phone);
  if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(phone))) {
    wx.showToast({
      title: "手机号码填写有误",
      icon: 'none',
      mask: true,  //是否显示透明蒙层，防止触摸穿透，默认：false
      duration: 2000
    });
    return false;
  }
  return true
};
//验证姓名
export function checkName(name){
  var regName = /^[\u4e00-\u9fa5]{2,4}$/;
  if (!regName.test(name)) {
    wx.showToast({
      title: "请正确输入您的姓名",
      icon: 'none',
      mask: true,  //是否显示透明蒙层，防止触摸穿透，默认：false
      duration: 2000
    });
    return false;
  }
  return true
};
//验证文本框
export function checkAddress(a){
  console.log(a, a.length)
  if (!(a.length > 4 || a.length < 200 || a != null)) {
    wx.showToast({
      title: "详细地址长度 （4~200）之间",
      icon: 'none',
      mask: true,  //是否显示透明蒙层，防止触摸穿透，默认：false
      duration: 2000
    });
    return false;
  }
  return true
}