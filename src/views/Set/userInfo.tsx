import React, { FC, useState, useContext } from 'react';
import { UserOutlined } from '@ant-design/icons'
import { Button, Form, Input, Avatar, message } from 'antd'
import { getItem, setItem } from 'utils/tools'
import './userInfo.less'
import { postData } from 'utils/service';
import { DispatchContext } from "utils/context";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const SetUserInfo: FC = () => {
  const [userInfo, setuserInfo] = useState<any>(getItem('info'))
  const [avatorFile, setAvatorFile] = useState<any>(null)
  const dispatch = useContext(DispatchContext)
  const upload = async (e: any) => {
    console.log(e)
    console.log(e.target.files)
    const target = e.target.files[0]
    const maxSize = 2 * 1024 * 1024; //2M
    const contType = ['image/pjpeg', 'image/jpeg', 'image/png', 'image/x-png']
    if (!target) {
      return
    }
    if (!contType.includes(target.type)) {

      return message.error('只支持png和jpg格式图片')
    }
    if (target.size > maxSize) {

      return message.error('图片大小不能超过2M')
    }
    const reader = new FileReader()
    reader.onload = (evt: any) => {
      setAvatorFile(target)
      setuserInfo({ ...userInfo, avator: evt.target.result })
      // setUrl(evt.target.result)
    }
    reader.readAsDataURL(target)
  }

  const onFinish = async (values: any) => {
    console.log('Success:', values);
    if (avatorFile) {
      values.avator = avatorFile
    } else {
      delete values.avator
    }
    console.log(values)
    const formData = new FormData()
    Object.keys(values).forEach((valKey: any) => {
      formData.append(valKey, values[valKey])
    })
    const res: any = await postData('/update-infos', formData)
    console.log(res)
    if (res.status !== 200) {
      return message.error(res.message)
    }
    message.success(res.message)
    dispatch({ val: res.info, type: 'update' })
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return <div className="set-userinfo">
    <Form
      {...layout}
      style={{ width: '600px' }}
      name="basic"
      initialValues={userInfo}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="姓名"
        name="username"
        rules={[{ required: true, message: 'Please input your nickname!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="别名"
        name="nickname"
        rules={[{ required: true, message: 'Please input your nickname!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="邮箱"
        name="email"
        rules={[{ required: true, message: 'Please input your email!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="电话"
        name="phone"
        rules={[{ required: true, message: 'Please input your phone!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="微信"
        name="wechat"
        rules={[{ required: true, message: 'Please input your wechat!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="头像"
        name="avator"
      >
        <div className="userInfo-avator">
          <input type="file"
            onChange={upload}
            style={{
              opacity: 0, position: 'absolute',
              left: 0,
              top: 0,
              right: 0,
              bottom: 0,
              zIndex: 2
            }}
            accept=".jpg,.jpeg,.png"	//限制文件类型
          />
          <Avatar size={60} src={userInfo.avator} icon={<UserOutlined />} />

        </div>
        {/* <div style={{ textAlign: 'center' }}>
          <Image src={userInfo.avator} width="200px" />
        </div> */}
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          更新
        </Button>
      </Form.Item>
    </Form>


  </div>
}

export default SetUserInfo