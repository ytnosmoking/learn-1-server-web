import React, { FC, useRef, useState, useEffect } from 'react';

import {  Button, Radio,Row } from 'antd'
import './MoveImage.less'
import img from '../../assets/img/timg.jpeg'

const MoveImage: FC = () => {
  const [splitArr, setsplitArr] = useState<any[]>([])
  const [moveArr, setMoveArr] = useState<any[]>([])
  const [url, setUrl] = useState<string>(img)
  const [changeType, setChangeType] = useState(3)
  const moveDom: any = useRef(null)
  const originImg: any = useRef(null)
  const smallImg: any = useRef(null)
  const bigDom: any = useRef(null)
  const smallDom: any = useRef(null)
  const innerImgs: any = useRef(null)



  // 绘制 画布
  const drawImage = () => {
    // innerImgs.current.style.width = 200*changeType+'px'
    // innerImgs.current.style.height = 200*changeType+'px'
    // innerImgs.current.style.width = 200*3+'px'
    // innerImgs.current.style.height = 200*3+'px'
    const canvas: any = document.getElementById('contImg')
    console.log(canvas)
    //@ts-ignore
    const ctx = canvas.getContext('2d')

    canvas.width = 600
    canvas.height = 600
    const w = canvas.width
    const h = canvas.height
    console.log(w, h)

    // const img = document.createElement('img')
    const img = document.getElementById('loc-img')
    // img.src = url
    ctx.drawImage(img, 0, 0, w, h)
    const numX = changeType
    const numY = changeType
    const splaceX = 0
    const splaceY = 0
    const locationArr: any[] = []
    for (let y = 0; y < numY; y++) {
      for (let x = 0; x < numX; x++) {
        var location = {
          xIndex: x,
          yIndex: y,
          // isEmpty: x === y && x === 2,
          isEmpty: x === y && x === changeType-1,
          'x': x * w / numX - splaceX,
          'y': y * h / numY - splaceY,
          'Dx': x * w / numX + w / numX,
          'Dy': y * h / numY + h / numY,
          'locationOption': (x + 1).toString() + (y + 1).toString(),
        };
        // if (y !== 2 || x !== 2) {

        locationArr.push(location);
        // }
        cropImage(canvas, (x * w / numX) - splaceX, (y * h / numY) - splaceY, w / numX, h / numY, location);
      };
    };
    const keyArr = locationArr.map((item: any, index: number) => ({
      ...item, key: index,
      loc: index
    }))// 标准 9格数据  要对 前 八个数据 乱序

    const str = (val: any) => JSON.stringify(val)
    const parse = (val: string) => JSON.parse(val)
    setMoveArr(parse(str(keyArr)))
    const last = keyArr[keyArr.length - 1]
    const before = keyArr.slice(0, keyArr.length - 1)
      .sort(() => Math.random() - 0.5)
      .map((item: any, index: number) => ({
        ...item, key: index, loc: index
      }))


    setsplitArr(parse(str([...before, last])))
  }
  const cropImage = (targetCanvas: any, x: number, y: number, width: number, height: number, obj: any) => {
    var targetctx = targetCanvas.getContext('2d');
    var targetctxImageData = targetctx.getImageData(x, y, width, height);
    // sx, sy, sWidth, sHeight
    var c = document.createElement('canvas');
    var ctx: any = c.getContext('2d');
    c.width = width;
    c.height = height;
    ctx.rect(0, 0, width, height);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.putImageData(targetctxImageData, 0, 0);
    // imageData, dx, dy
    // 创建img 块
    // var img = document.createElement('img');
    const src = c.toDataURL('image/jpeg', 1);
    obj.src = src

  }


  const keyDown = (e: any) => {
    // console.log(e)
    // code 38 向上  40 向下 37 左 39 右
    console.log(e.keyCode)

    // 所有imgs DOM
    const imgs = document.getElementsByClassName('innerImgs')[0].getElementsByTagName('img')
    if (imgs.length === 0) {
      return
    }
    const code = e.keyCode
    //  空图像  start
    const sourceItem = splitArr.find(item => item.isEmpty)
    // 空图像 dom
    const sourceImg = imgs[imgs.length - 1]

    // const sloc = { ...sourceItem.loc }
    const sIndex = sourceItem.loc
    const arr = Array(changeType).fill(1)
    const keyInfo: any = {
      37: {
        key: 'left',
        inIndex: arr.map((item:any,index:number)=>(0+changeType*index)) ,
        // [0, 3, 6],
        to: 'left',
        num: -1
      },
      39: {

        key: 'right',
        // inIndex: [2, 5, 8],
        inIndex: arr.map((item:any,index:number)=>(changeType-1+changeType*index)) ,
        to: 'left',
        num: 1
      },
      38: {
        key: 'top',
        // inIndex: [0, 1, 2],
        inIndex: arr.map((item:any,index:number)=>(index)),
        to: 'top',
        num: -changeType
      },
      40: {
        key: 'bottom',
        inIndex: arr.map((item:any,index:number)=>(changeType*changeType - index-1)).sort((a:any,b:any)=>a-b),
        to: 'top',
        num: changeType
      }
    }
    const info = keyInfo[code]
    if (info.inIndex.includes(sIndex)) {
      return
    }
    const calIndex = sIndex + info.num
    const targetItem = splitArr[calIndex] // 要替换的项
    const targetImg = imgs[targetItem.key] // 要替换的图
    const tIndex = targetItem.loc
    const sL = sourceImg.style[info.to]
    const tL = targetImg.style[info.to]
    sourceImg.style[info.to] = tL
    targetImg.style[info.to] = sL
    sourceItem.loc = tIndex
    targetItem.loc = sIndex
    splitArr[calIndex] = sourceItem
    splitArr[sIndex] = targetItem
  }

  const check = () => {
    setsplitArr([])
    setTimeout(() => {
      const str = JSON.stringify(moveArr)
      const parse = (val: string) => JSON.parse(val)
      setsplitArr(parse(str))
    })
  }

  const upload = (e: any) => {
    console.log(e)
    console.log(e.target.files)
    const target = e.target.files[0]
    const reader = new FileReader()
    reader.onload = (evt: any) => {
      setUrl(evt.target.result)
    }
    reader.readAsDataURL(target)
  }

  const moveInImage = (evt: any) => {
    const e = evt || window.event
    const move = moveDom.current
    const small = smallDom.current
    const big = bigDom.current
    const origin = originImg.current



    // console.log(`move.offsetWidth=====${move.offsetWidth / 2}`)

    let m_x = e.clientX - 200 - small.offsetLeft - move.offsetWidth / 2
    let m_y = e.clientY - 64 - small.offsetTop - move.offsetHeight / 2

    m_x = m_x < 0 ? 0 : m_x
    m_x = m_x > small.offsetWidth - move.offsetWidth ? small.offsetWidth - move.offsetWidth : m_x;
    m_y = m_y < 0 ? 0 : m_y
    m_y = m_y > small.offsetHeight - move.offsetHeight ? small.offsetHeight - move.offsetHeight : m_y;
    move.style.left = m_x + 'px'
    move.style.top = m_y + 'px'


    let big_x = m_x / (small.offsetWidth - move.offsetWidth) * (origin.offsetWidth - big.offsetWidth)
    let big_y = m_y / (small.offsetHeight - move.offsetHeight) * (origin.offsetHeight - big.offsetHeight)
    origin.style.left = -big_x + 'px'
    origin.style.top = -big_y + 'px'

  }

  const enterImg = () => {
    
    moveDom.current.style.display = "block"
    // bigDom.current.style.display = "inline-block"
    bigDom.current.style.opacity = "1"
    bigDom.current.style.zIndex = "2"
    // smallDom.current.style.zIndex = "3"
  }
  const leaveImg = () => {
    moveDom.current.style.display = "none"
    bigDom.current.style.opacity = "0"
    bigDom.current.style.zIndex = "-100"
    // smallDom.current.style.zIndex = "1"
  }

  useEffect(() => {
    drawImage()
    return () => {
      
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [changeType])


  return <div className="move-image">
    <div className="btn">
      <Button type="primary" >上传
        <input id="img-upload"
          accept=".jpg,.jpeg,.png"	//限制文件类型

          onChange={upload} type="file" name="" />
      </Button>
      <Button type="primary" danger onClick={check}> 查看 </Button>
      <Button type="primary" onClick={drawImage}>start
      
      </Button>
      <Row align="middle">
      <Radio.Group onChange={(e:any)=> {
        setChangeType(e.target.value)
      }} value={changeType}>
        <Radio value={3}>3X3</Radio>
        <Radio value={4}>4X4</Radio>
        <Radio value={5}>5X5</Radio>
        
      </Radio.Group>
      </Row>
    </div>
    <div className="cont" style={{ display: 'none' }}>
      <canvas id="contImg" ></canvas>
    </div>
    <div className="cont innerImgs"
     ref={innerImgs}
      tabIndex={0}
      // style={{width: changeType*200+'px',height:changeType*200+'px'}}
      onKeyDown={(e: any) => keyDown(e)}>
      {splitArr.map((item: any, index: number) => {
        return <img src={item.src} key={index}
          crossOrigin="anonymous"
          style={{
            left: (index % Math.sqrt(splitArr.length)) * 600/changeType,
            top: Math.floor(index / Math.sqrt(splitArr.length)) * 600/changeType,
            opacity: index === splitArr.length - 1 ? 0 : 1,
            zIndex: index === splitArr.length - 1 ? 1 : 2
          }}
          alt={`img${index}`} />
      })}
    </div>
    {url &&
      <>
        <div className="show" ref={smallDom} onMouseMove={moveInImage} onMouseEnter={enterImg} onMouseLeave={leaveImg}>
          <span className="move" ref={moveDom} ></span>
          <img src={url} ref={smallImg} id="loc-img" alt={url} />
        </div>
        <div className="show-big show" ref={bigDom}>
          <img src={url} ref={originImg} alt="" />
        </div>
      </>
    }
  </div>
}


export default MoveImage