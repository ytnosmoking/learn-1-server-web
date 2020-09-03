import React, { FC, useState, memo, useMemo, useCallback } from 'react';
import { Button, Tooltip, Drawer, Tag, Divider, Row } from 'antd'
import { getData, postData } from 'utils/service'
import { API } from 'config/url'
import './index.less'


type content = {
  all_rate: string,
  song_id: string,
  rank_change: string,
  biaoshi: string,
  author: string,
  album_id: string,
  pic_small: string,
  title: string,
  pic_big: string,
  album_title: string
}

type listOne = {
  pic_s210: string,
  bg_pic: string,
  color: string,
  pic_s444: string,
  count: number
  type: number
  content: content[],
  bg_color: string
  web_url: string
  name: string
  comment: string
  pic_s192: string
  pic_s260: string
}
type lists = {
  lists: listOne
  visible: boolean
  close: (e: any) => void
}


const Music: FC = (props: any) => {
  console.log('Music')
  const [lists, setlists] = useState<any[]>([])
  const [visible, setVisible] = useState(false);
  const [selectList, setSetList] = useState<any>({})

  // 获取数据
  const getMovie = async () => {
    const res: any = await getData(API.movie)
    console.log(res)
    if (res.code === 200) {
      setlists(res.result)
    }
  }

  const getClound = async () => {
    const res: any = await getData('/?type=playlist&id=309390784')
    console.log(res)
  }

  // 颜色值
  const filterColor = useCallback((val: string) => {
    console.log('update - music -filterColor')
    let str = val.replace(/^0x([0-9a-fA-f]{2})([0-9a-fA-f]{2})([0-9a-fA-f]{2})/, '$1,$2,$3')
    const strArr = str.split(',')
    const rgb = strArr.reduce((pre: number[], cur) => {
      if (cur) {
        return [...pre, parseInt(`0x${cur}`)]
      } else {
        return pre
      }
    }, [])
    return `rgb(${rgb.join(",")})`
  }, [])

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const SlideDrawer = memo((props: lists) => {
    return <Drawer
      title={props?.lists?.name}
      placement="right"
      width={300}
      onClose={props.close}
      visible={props.visible}
    >
      {
        console.log(1)
      }
      {props.lists.content?.map((list: content, index: number) => {
        return <div key={index}>
          <Divider plain>歌名: {list.title}</Divider>
          <p>标识: {list.biaoshi.split(',')
            .map((tag: any, tIndex: number) =>
              <Tag key={tIndex}>{tag}</Tag>)}</p>
          <p>专辑:{list.album_title}</p>
          {
            list.rank_change !== '0' && <p>{list.rank_change > '0' ? '上升' : '下降'} {list.rank_change}</p>
          }
          <img style={{ width: '100%' }} src={list.pic_big} alt="" />
          <p>累计播放量:{list.all_rate}</p>
          <p>作者:{list.author}</p>
        </div>
      })}
    </Drawer>
  })

  // 查看
  const checkList = (val: any) => {
    setSetList(val)
    setVisible(true)
  }

  const musicLists = useMemo(() => {
    console.log('update - musicLists')
    return <ul className="lists">
      {
        lists?.map((list: any, index: number) => {
          return <li key={index} style={{
            backgroundColor: filterColor(list.bg_color),
          }}>
            <img src={list.bg_pic} alt="" />
            <h3 style={{ color: filterColor(list.color) }}>
              <span>
                {list.name}
              </span>
              <Button type="text" danger onClick={() => checkList(list)}>
                查看
          </Button>
            </h3>
            <Tooltip title={list.comment}>
              <div className="comment">{list.comment}</div>
            </Tooltip>
          </li>
        })
      }
    </ul>
  }, [filterColor, lists])

  return <div className="music-content">
    <Row align="middle" justify="space-between">
      <Button type="primary" onClick={getMovie}>get Music</Button>
      <Button type="primary" onClick={getClound}>get Clound Music</Button>
    </Row>
    <Divider></Divider>
    {musicLists}

    {/* <SlideDrawer lists={selectList} visible={visible} close={() => setVisible(false)} ></SlideDrawer> */}
    <Drawer
      title={selectList?.name}
      placement="right"
      width={300}
      onClose={() => setVisible(false)}
      visible={visible}
    >{
        console.log(1)
      }
      {selectList?.content?.map((list: any, index: number) => {
        return <div key={index}>
          <Divider plain>歌名: {list.title}</Divider>
          <p>标识: {list.biaoshi.split(',')
            .map((tag: any, tIndex: number) =>
              <Tag key={tIndex}>{tag}</Tag>)}</p>
          <p>专辑:{list.album_title}</p>
          {
            list.rank_change !== '0' && <p>{list.rank_change > 0 ? '上升' : '下降'} {list.rank_change}</p>
          }
          <img style={{ width: '100%' }} src={list.pic_big} alt="" />
          <p>累计播放量:{list.all_rate}</p>
          <p>作者:{list.author}</p>
        </div>
      })}
    </Drawer>

  </div>
}


export default memo(Music)