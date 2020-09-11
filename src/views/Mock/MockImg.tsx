import React, { FC, useState, useEffect, useRef } from 'react';
import { CloseCircleOutlined } from '@ant-design/icons'
import { Image as AnImage, Button, message, Row } from 'antd'
import { postData, getData } from 'utils/service'
import './index.less'


const MockImg: FC = () => {
  const [lists, setLists] = useState<any[]>([])
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [info, setInfo] = useState<any>({ page: 0, pageSize: 5, total: null, })
  const [splitLists, setSplitLists] = useState<any[][]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isResize, setIsResize] = useState(false)
  const imgsCont: any = useRef(null)
  const scrollBody: any = useRef(null)
  const tag = useRef(false)

  const getImage = async () => {
    if (isLoading) {
      return
    }
    setIsLoading(true)

    if (info.total !== null && info.total <= lists.length) {
      setIsLoading(false)
      return message.error(`没有数据了 ---- 最多${info.total}条`)
    }
    const res: any = await getData('/users/img', { ...info, page: info.page / 1 + 1 })
    // const res: any = await getData('/mockImage') // mock
    if (res.status === 200) {
      const resLists = res.lists
      const info = res.info
      setInfo(info)
      for (let i = 0; i < resLists.length; i++) {
        const cur = resLists[i]
        cur.h = await calH(cur)
      }
      setLists([...lists, ...resLists])
    } else {
      message.error(res.message)
    }

  }

  const calH = (item: any) => {
    return new Promise((resolve: any, reject: any) => {
      const img = new Image();
      img.src = `${item.dir}/${item.name}`;
      img.onload = () => {
        const h = 200 * img.height / img.width
        resolve(h);
      };
    })
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const resizeCont = async () => {
    if (isResize) {
      return
    }
    setIsResize(true)
    //@ts-ignore
    const contWidth = imgsCont.current.offsetWidth
    const counts = Math.floor(contWidth / 200)
    let arr: any[][] = []
    let len: number[] = []


    Array(counts).fill(1).forEach((item: any, index: number) => {
      arr[index] = []
      len[index] = 0
    })
    for (let i = 0; i < lists.length; i++) {
      const cur = lists[i]
      const min = Math.min(...len)
      const minIndex = len.findIndex((item: number) => item === min)
      // const res: any = await calH(cur)
      len[minIndex] += cur.h
      arr[minIndex].push(cur)
    }
    setSplitLists(arr)
    setIsResize(false)
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const scrollCont = (e: any) => {
    console.log(e)
    if (isLoading) {
      return
    }
    //@ts-ignore
    const body: HTMLBaseElement = scrollBody.current
    //@ts-ignore
    const cont: HTMLBaseElement = imgsCont.current

    const imgsH = cont.offsetHeight // 所有图片dom 高度
    // const imgsT = cont.offsetTop // 距离 父元素dom顶部 高度
    const bodyH = body.offsetHeight // 父元素 高度
    const bodyST = body.scrollTop // 父元素卷曲高度
    console.log(`bodyH----${bodyH}`)
    console.log(`bodyST----${bodyST}`)
    console.log(`imgsH----${imgsH}`)
    // if (bodyH + bodyST - imgsH > 50) {
    const bodyT = bodyH + bodyST
    if (imgsH <= bodyT || tag.current) {
      return
    }

    if (imgsH - bodyT < 200) {
      tag.current = true
      getImage()
    }
    // if (bodyH + bodyST > imgsH) {
    //   body.scrollTop = bodyST - 300
    //   getImage()
    // }
  }

  const upload = async (e: any) => {
    console.log(e)
    console.log(e.target.files)
    const allFiles = Array.from(e.target.files)
    const maxSize = 2 * 1024 * 1024; //2M
    const contType = ['image/pjpeg', 'image/jpeg', 'image/png', 'image/x-png']
    // if (!contType.includes(target.type)) {
    if (allFiles.some((item: any) => !contType.includes(item.type))) {
      return message.error('只支持png和jpg格式图片')
    }
    // if (target.size > maxSize) {
    if (allFiles.some((item: any) => item.size > maxSize)) {
      return message.error('图片大小不能超过2M')
    }
    const formData = new FormData()
    allFiles.forEach((item: any, index: number) => {
      formData.append(`${index}`, item)
    })
    const res: any = await postData('/users/upload', formData)
    if (res.status !== 200) {
      return message.error(res.message)
    }
    return message.success(res.message)
  }

  const deleteImg = async (item: any, index: number, sItem: any = [], sIndex: number) => {
    const res: any = await postData('/users/delete-img', item)
    console.log(res)
    if (res.status !== 200) {
      return message.error(res.message)
    }
    const listIndex = lists.findIndex((list: any) => list.id === item.id)
    lists.splice(listIndex, 1)
    setLists([...lists])

    return message.success(res.message)
  }
  useEffect(() => {
    tag.current = false
  }, [splitLists])

  useEffect(() => {

    setIsLoading(false)
    resizeCont()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lists])


  useEffect(() => {
    const content: HTMLBaseElement = scrollBody.current
    window.addEventListener('resize', resizeCont)
    //@ts-ignore
    content.addEventListener('scroll', scrollCont)
    return () => {
      window.removeEventListener('resize', resizeCont)
      content.removeEventListener('scroll', scrollCont)
    }
  }, [resizeCont, scrollCont])

  return <div className="mock" ref={scrollBody}>

    <hr />
    <Row align="middle" justify="space-around">
      <Button type="primary" onClick={getImage}>请求图片</Button>
      <Button type="primary" style={{ overflow: 'hidden' }}>
        上传图片
      <input type="file"
          onChange={upload}
          multiple
          style={{
            opacity: 0, position: 'absolute',
            left: 0,
            top: 0,
            right: 0,
            bottom: 0
          }}
          accept=".jpg,.jpeg,.png"	//限制文件类型
        />
      </Button>
    </Row>
    <hr />
    <div className="imgs" ref={imgsCont}>
      {splitLists.map((sItem: any, sIndex: number) => {


        return <div key={sIndex}>
          {sItem.map((item: any, index: number) => {
            // return <AnImage
            //   key={index}
            //   src={`${item.dir}/${item.name}`}
            // />
            return <div key={index} className="single-img">
              <CloseCircleOutlined
                onClick={() => deleteImg(item, index, sItem, sIndex)}
                className="single-img-delete" />
              <AnImage
                key={index}
                src={`${item.dir}/${item.name}`}
              />
              {/* <img
                src={`${item.dir}/${item.name}`}
                alt={'' + index}
              /> */}
            </div>
          })}
        </div>
      })}
    </div>

  </div>
}
export default MockImg