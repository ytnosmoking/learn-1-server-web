import React, { FC, useState, memo, useMemo } from 'react';
import { Button, Drawer, Tag, Divider, Image, Row } from 'antd'
import { getFetch } from 'utils/service'
import { KugoApi } from 'config/url'
import './kugo.less'


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


const KuGou: FC = (props: any) => {
  console.log('Music')
  const [lists, setlists] = useState<any[]>([])
  const [visible, setVisible] = useState(false);
  const [selectList, setSetList] = useState<any>({})


  const getClound = async () => {
    const response = await getFetch(
      KugoApi.category,
      {
        pid: 0,
        apiver: 2,
        plat: 0
      }
    )
    const res = await response.json()
    console.log(res)
    setlists(res.data.info)
  }
  const getHot = async () => {
    const response = await getFetch(
      KugoApi.hot,
      {
        showtype: 3,
        apiver: 2,
        plat: 0
      }
    )
    const res = await response.json()
    console.log(res)
    setlists(res.data.info)
  }





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
          return <li key={index} onClick={() => checkList(list)} >
            <img src={list.icon || list.bannerurl} alt="" />
            <h3 >
              <span>
                {list.name}
              </span>
            </h3>
          </li>
        })
      }
    </ul>
  }, [lists])

  return <div className="music-content">
    <Row align="middle" justify="start">
      <Button type="primary" onClick={getClound}>所有分类</Button>
      <Button type="primary" onClick={getHot}>热门分类</Button>
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
      {selectList?.children?.map((list: any, index: number) => {
        return <div key={index}>
          <Divider plain> {list.name}</Divider>
          {list.bannerurl && <Image src={list.bannerurl} />}
          {list.icon && <Image src={list.icon} />}
          {list.imgurl && <Image src={list.imgurl} />}
          {list.jump_url && <a href={list.jump_url} target="blank">jump</a>}
        </div>
      })}
    </Drawer>

  </div>
}


export default memo(KuGou)