import React, { FC, useContext, useLayoutEffect, useCallback, memo, useState } from 'react';
import { Layout, Button, Row, Col, message } from 'antd';
import { LogoutOutlined } from '@ant-design/icons'
import { DispatchContext, TokenContext } from 'utils/context'
import { postData } from "utils/service";
import { API } from 'config/url'
import './index.less'

const { Header, Sider, Content } = Layout;


const Base: FC = (props: any) => {
  const [info, setInfo] = useState<any>(useContext(TokenContext))
  const dispatch = useContext(DispatchContext)
  // const infos = useContext(TokenContext)
  const logOut = useCallback(() => {
    console.log(1)
    dispatch({ type: "logout" })
    props.history.push({ pathname: '/login' })
  }, [dispatch, props.history])
  // useLayoutEffect(() => {
  //   console.log(info)

  //   if (!info || !info.token) {
  //     logOut()
  //   }
  // })

  const getInfos = async () => {
    const res = await postData(API.infos)
    console.log(res)
    if (res.status !== 200) {
      logOut()
      //@ts-ignore
      return message.error(res.message)
    }
    //@ts-ignore
    setInfo(res.info)

  }


  return <Layout className="layout">
    <Sider>Sider</Sider>
    <Layout>
      <Header className="header" >
        <div>

          <span>{info?.nickname}</span>
          <img src={info?.avator} alt="" />
        </div>
        <div>
          <Button danger type="primary" onClick={logOut}
            icon={<LogoutOutlined />}
          > 退出</Button>
        </div>
      </Header>
      <Content className="bg-sky">Content
        <hr />
        <Button onClick={getInfos}> get more infos</Button>
      </Content>
    </Layout>
  </Layout>
}

export default memo(Base)