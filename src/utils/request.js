/*
 * @Author: jhl
 * @Date: 2021-08-07 14:57:09
 * @LastEditors: jhl
 * @LastEditTime: 2021-08-09 16:11:14
 * @Description:
 */
import axios from "axios";

const instance = axios.create({
  // timeout: 5000 // 5秒等待时间，否则超时
});

export const get = (url, params = {}) => {
  return new Promise((resolve, reject) => {
    instance
      .get(url, {
        params
      })
      .then(response => {
        resolve(response?.data);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const post = (url, data = {}) => {
  return new Promise((resolve, reject) => {
    instance
      .post(url, data, {
        headers: {
          "Content-Type": "application/json;chartset=UTF-8"
        }
      })
      .then(response => {
        resolve(response?.data);
      })
      .catch(err => {
        reject(err);
      });
  });
};
