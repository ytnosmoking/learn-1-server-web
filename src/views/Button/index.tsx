import React, { FC, useState } from 'react';
import { Button, Divider, Row, Col, Collapse } from 'antd'
import { postData, getData } from 'utils/service'

enum typeE {
  'primary',
  'ghost',
  'dashed',
  'danger',
  'link',
  'text',
  'default'
}
interface listsType {
  name: string,
  children: typeE[]
}

const { Panel } = Collapse;

const lists = [{
  name: 'type',
  children: ["primary", 'ghost', 'default', 'dashed', 'danger', 'text', 'link']
}, {
  name: 'size',
  children: ["large", "middle", 'small']
}]
const Btn: FC = () => {
  // const [types] = useState(["primary", 'ghost', 'default', 'dashed', 'danger', 'text', 'link'])
  // const [sizes] = useState(["large", "middle", 'small'])
  const [dataGet, setDataGet] = useState<any[]>([])
  const [dataPost, setDataPost] = useState<any[]>([])
  const postKey = ['ghost', 'dashed', 'default']
  const getInfo = async (type: string) => {
    let res: any = null
    if (postKey.includes(type)) {
      res = await postData(`/${type}`)
      setDataPost(res.list)
    } else {

      res = await getData(`/${type}`)
      setDataGet(res.list)
    }
    console.log(res)
  }

  return <div>
    {lists.map((list, index) => (
      <div key={index}>
        <Divider >Button {list.name}</Divider>
        <Row align="middle" justify="space-around">
          {list.children.map((type, index: number) => {
            const name = list.name
            if (name === 'type') {
              // @ts-ignore
              return <Button type={type} key={index} onClick={() => getInfo(type)}>{type}</Button>
            } else if (name === 'size') {
              // @ts-ignore
              return <Button size={type} key={index}>{type}</Button>
            }
            return <Button key={index}>{index}</Button>

          })}
        </Row>
      </div>
    ))}

    <Row>
      <Col span={12}>
        <h3>getData</h3>
        <Collapse defaultActiveKey={['1']}>
          {dataGet.map((item: any, index: number) => {
            return <Panel header={`title -${index}`} key={index}>
              {Object.keys(item).map((jtem: any, jndex: number) => {
                return <Row key={jndex}>
                  <Col span={8}>{jtem}</Col>
                  <Col span={16}>{item[jtem]}</Col>
                </Row>
              })}
            </Panel>
          })}
        </Collapse>
      </Col>
      <Col span={12}>
        <h3>postData</h3>
        <Collapse defaultActiveKey={['1']}>
          {dataPost.map((item: any, index: number) => {
            return <Panel header={`title -${index}`} key={index}>
              {Object.keys(item).map((jtem: any, jndex: number) => {
                return <Row key={jndex}>
                  <Col span={8}>{jtem}</Col>
                  <Col span={16}>{item[jtem]}</Col>
                </Row>
              })}
            </Panel>
          })}
        </Collapse>
      </Col>
    </Row>

  </div >
}

export default Btn