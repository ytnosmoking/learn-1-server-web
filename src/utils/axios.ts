import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { getItem } from "utils/tools";
import { message } from "antd";
import { baseUrl } from "config/url";
class HttpRequest {
  baseUrl: string;
  constructor(baseUrl = "") {
    this.baseUrl = baseUrl;
  }
  getDefaultConfig() {
    const config = {
      baseURL: this.baseUrl,
      method: "post",
      timeout: 30000,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        // "Content-Type": "application/json;charset=utf-8",
        "X-Requested-With": "XMLHttpRequest",
      },
    };
    return config;
  }
  interceptors(instance: AxiosInstance, url: any) {
    instance.interceptors.request.use(
      (config) => {
        const info = getItem("info");
        if (info && info?.token) {
          config.headers.Authorization =
            "Bearer " + info.token.replace(/"/g, "");
        }
        return config;
      },
      (error) => {
        console.log(error);
        return Promise.reject(error);
      }
    );
    instance.interceptors.response.use(
      (res) => {
        // console.log(`response`)
        console.log("全局拦截返回值");
        console.log(res);
        if (res.status >= 200 && res.status < 300) {
          if (!res.data.status) {
            message.warning(res.data.msg);
          }
          return res.data;
        }
        return res;
      },
      (err) => {
        console.dir(err);
        if (err.message.indexOf("timeout") > -1) {
          // 判断请求异常信息中是否含有超时timeout字符串
          message.error("请求超时");
        }
        return err;
      }
    );
  }
  request(options: AxiosRequestConfig) {
    const instance = axios.create();
    options = Object.assign(this.getDefaultConfig(), options);
    this.interceptors(instance, options.url);
    return instance(options);
  }
}
const service = new HttpRequest(baseUrl);
export default service;
