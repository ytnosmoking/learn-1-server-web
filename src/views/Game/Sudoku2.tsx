import React, { FC, useState } from 'react';
import { Button, message } from 'antd'
import './Sudoku.less'



const randomIndex = (max: number) => Math.floor(Math.random() * max)

// interface arrKey {

//   [key: string | number]: any
// }
const Sudoku2: FC = () => {
  const base = [1, 2, 3, 4, 5, 6, 7, 8, 9] // 标准数据
  const initArr = () => [...Array(9).fill(1).map((() => {
    return Array(9).fill(0)
  }))]
  const [isLoad, setIsLoad] = useState(false)
  const [arr, setArr] = useState(initArr())
  const [rightArr, setRightArr] = useState(initArr()) //正确的  数据
  const [loc, setLoc] = useState({ x: 0, y: 0 })
  const [keyBoard, setKeyboard] = useState(false) // 显示键盘
  const [keyPos, setKeyPos] = useState({ top: 0, left: 0 }) //键盘位置



  // 计算 X 行的 数
  const calX = (arr: number[][], x: number, y: number) => {
    return arr[x]
  }
  // 计算 Y 行的 数
  const calY = (arr: number[][], x: number, y: number) => {
    let des: number[] = []
    for (let i = 0; i < x; i++) {
      des.push(arr[i][y])
    }
    return des
  }
  // 计算 九宫格 数
  const calC = (arr: number[][], x: number, y: number, flag: boolean = true) => {
    let des: number[] = []
    let m = Math.floor(x / 3) * 3
    let n = Math.floor(y / 3) * 3
    const m3 = m + 3, n3 = n + 3
    out:
    for (let i = m; i < m3; i++) {
      for (let j = n; j < n3; j++) {
        if (i === x && j === y && flag) {
          // continue
          break out;
        }
        des.push(arr[i][j])
      }
    }
    return des
  }

  // 过滤 X轴能够选择的数据
  const checkX = (arr: number[][], x: number, y: number) => {
    const des = calX(arr, x, y).slice(0, y)
    return base.filter((item: number) => !des.includes(item))
  }
  // 过滤 Y轴能够选择的数据
  const checkY = (arr: number[][], x: number, y: number) => {
    const des = calY(arr, x, y)
    return base.filter((item: number) => !des.includes(item))
  }
  // 过滤 九宫格轴能够选择的数据
  const checkCenter = (arr: number[][], x: number, y: number) => {
    const des = calC(arr, x, y)
    return base.filter((item: number) => !des.includes(item))
  }
  // X，Y ，九宫格数据 交集
  const checkCan = (arrX: number[], arrY: number[], arrC: number[]) => {
    return base.filter((item: number) => arrX.includes(item) && arrY.includes(item) && arrC.includes(item))
  }


  const checkBtn = () => {
    setIsLoad(true)

    const arr = initArr()
    const start = Date.now()
    const t = Array(9).fill(0) // 缓存 回到上一层重新循环的次数
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        const canX = checkX(arr, i, j)
        const canY = checkY(arr, i, j)
        const canCenter = checkCenter(arr, i, j)
        const canArr = checkCan(canX, canY, canCenter).sort(() => Math.random() - 0.5)
        if (canArr.length === 0) {
          t[i]++
          for (let tIndex = 0; tIndex < i; tIndex++) {
            t[tIndex] = 0
          }
          if (i !== 0) {
            i = i - t[i] // 计算在i处 重复了几次  次数越多 回上一层越多
            i = i > 0 ? i : 0
          }
          j = 0
          break;
        }
        if (canX.length === 1) {
          arr[i][j] = canX[0]
        } else if (canY.length === 1) {
          arr[i][j] = canY[0]
        }
        else if (canCenter.length === 1) {
          arr[i][j] = canCenter[0]
        } else {
          arr[i][j] = canArr[0]
        }

      }
    }
    const end = Date.now()
    console.log(`total====${end - start}`)
    setRightArr([...arr])
    const reCycleArr = (arr: any) => {

      return arr.map(((item: any) => {
        if (item instanceof Array) {
          return reCycleArr(item)
        }
        return item
      }))
    }
    const inArr = reCycleArr(arr)
    for (let i = 0; i < 60; i++) {
      inArr[randomIndex(9)][randomIndex(9)] = ''
    }

    setArr([...inArr])
    setIsLoad(false)


  }

  const openKeyBoard = (e: any, x: number, y: number) => {

    e.stopPropagation()
    const target = e.nativeEvent.target
    const h = target.clientHeight
    const w = target.clientWidth
    const top = target.offsetTop + h + 10
    const left = target.offsetLeft - w * 3 / 2
    setKeyboard(true)
    setLoc({ x, y })
    setKeyPos({
      top,
      left
    })
  }

  const changeItem = (item: number, e: any) => {
    console.log(item)
    e.stopPropagation()
    let flag = 'error'
    if (item === rightArr[loc.x][loc.y]) {
      arr[loc.x][loc.y] = item
      setArr(arr)
      flag = 'success'
    }
    //@ts-ignore
    message[flag](flag)
    if (flag === 'success') {
      setKeyboard(false)
    }
  }


  return <div className="sudoku" onClick={() => setKeyboard(false)}>
    <div className="btn">
      <Button type="primary" loading={isLoad} onClick={checkBtn}>checkBtn</Button>
      <Button danger onClick={() => {
        setArr(initArr())
      }}>resetCheck</Button>
    </div>
    <div className="cont2">
      {arr.map((item: any, index: number) => {
        return <div key={index} >
          {item.map((jtem: any, jIndex: number) => {
            return <div key={jIndex} onClick={(e: any) => openKeyBoard(e, index, jIndex)} >
              {jtem}
              {/* <InputNumber style={{ width: '100%' }} min={1} max={9} step={1} defaultValue={jtem} value={jtem} onChange={(e: any) => onChange(index, jIndex, e)} /> */}
            </div>
          })}
        </div>
      })}
      {keyBoard &&
        <div className="keyboard" style={keyPos} >
          {base.map((item: number) => <span key={item} onClick={(e: any) => changeItem(item, e)}>{item}</span>)}
        </div>
      }
    </div>

  </div>
}

export default Sudoku2