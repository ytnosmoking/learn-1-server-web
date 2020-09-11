import service from "./axios";
import { kugoUrl } from "config/url";
export const getData = (url: string, params?: any) => {
  return service.request({
    url,
    params,
    method: "get",
  });
};
export const postData = (url: string, data?: any) => {
  return service.request({
    url,
    data,
  });
};

export const getById = (url: string, id: string | number, params?: any) => {
  return service.request({
    url: url + "/" + id,
    params,
    method: "get",
  });
};

export const getFetch = async (url: string, params: any = {}) => {
  const keys = Object.keys(params);

  const keysLink = keys.reduce((pre, cur) => {
    return pre + cur + "=" + params[cur] + "&";
  }, "?");
  const res = await fetch(kugoUrl + url + keysLink, {
    method: "GET",
  });

  console.log(res);
  // const result = await res.json();
  return res;
};
