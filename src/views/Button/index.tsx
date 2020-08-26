import React, { FC } from 'react';
import { Button, Divider, Row } from 'antd'
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

  const postKey = ['ghost', 'dashed', 'default']
  const getInfo = async (type: string) => {
    let res: any = null
    if (postKey.includes(type)) {
      res = await postData(`/${type}`)
    } else {

      res = await getData(`/${type}`)
    }
    console.log(res)
  }

  return <div>
    {lists.map((list, index) => (
      <>
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
          <Button></Button>
        </Row>
      </>
    ))}

  </div >
}

export default Btn