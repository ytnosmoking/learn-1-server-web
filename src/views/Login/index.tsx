import React, { FC, useContext, useLayoutEffect, memo } from 'react';
import { Form, Input, Button, Checkbox, message } from 'antd'
import { DispatchContext, TokenContext } from 'utils/context'
import './index.less'
import { postData } from 'utils/service'
import { API } from 'config/url'
import Mock from 'mockjs'
const Random = Mock.Random

const Login: FC = (props: any) => {
  const dispatch = useContext(DispatchContext)
  const info = useContext(TokenContext)
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };
  const login = async (data: any) => {
    const res: any = await postData(API.login, data)
    if (res.status === 200) {
      const val = { ...res.info, token: res.token }
      dispatch({ val, type: 'login' })

      props.history.push({ pathname: '/index' })

    } else {
      message.error(res.message)
    }
  }
  const register = async (data: any) => {
    console.log('register -----')
    const res: any = await postData(API.register, data)
    console.log(res)
    const type = res.status === 200 ? 'success' : 'error'
    message[type](res.message)

  }


  const onFinish = (values: any) => {
    console.log('Success:', values);
    const { create, ...params } = values
    if (create) {
      register(params)
    } else {
      login(params)
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  useLayoutEffect(() => {
    if (info && info.token) {
      props.history.push('/index')
    }
    return () => { }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return <div className="h100 login-view "
    style={{
      backgroundImage: `url(${Random.image('1200x800', Random.color(), '#fff', 'LOGIN')})`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundSize: 'cover'
    }}
  >
    <Form
      className="login-form"
      {...layout}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        labelAlign="left"
        label="用户名"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        labelAlign="left"
        label="密码"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item {...tailLayout} name="create" valuePropName="checked">
        <Checkbox>新建 </Checkbox>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  </div>
}

export default memo(Login)