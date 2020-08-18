import service from "./axios";
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
