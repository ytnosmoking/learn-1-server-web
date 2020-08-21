import React, { memo } from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import Loadable from "react-loadable";

const antIcon = <LoadingOutlined />;
const loading = () => (
  <Spin
    indicator={antIcon}
    size="large"
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  ></Spin>
);

export default (name: string) => {
  return memo(Loadable({
    loader: () => import(`views/${name}`),
    loading,
    delay: 1000,
  }))
};

export const LoadComponent = (name: string) => {
  return memo(Loadable({
    loader: () => import(`components/${name}`),
    loading,
    delay: 1000,
  }));
};
