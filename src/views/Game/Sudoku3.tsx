import React, { FC, useState } from 'react';
import { Button, InputNumber } from 'antd'
import './Sudoku.less'


const randomVal = (min: number, max: number) => Math.round(Math.random() * (max - min) + min)
const randomIndex = (max: number) => Math.floor(Math.random() * max)

const base = [1, 2, 3, 4, 5, 6, 7, 8, 9]
// interface arrKey {

//   [key: string | number]: any
// }
const Sudoku2: FC = () => {
  const [arr, setArr] = useState([...Array(9).fill(1).map(((item, index) => {
    let arr = [...base], inArr = []
    return Array(9).fill(1).map((jtem, jndex) => {
      return arr.splice(randomIndex(arr.length), 1)[0]
    })
  }))])

  const defaultArr = [
    ...Array(9).fill(0).map(item => Array(9).fill(0))
  ]
  console.log(defaultArr)

  const onChange = (index: number, jIndex: number, e: any) => {
    console.log(index, jIndex)
    console.log(e)
    // @ts-ignore
    arr[index][jIndex - 1] = e
    // setArr(arr)
  }
  const getRandom = (arr: number[], len: number) => arr[Math.floor(Math.random() * len)]

  function generateArr() {
    var arr: number[][] = [];
    for (var i = 0; i < 9; i++) {
      arr[i] = [];
      for (var j = 0; j < 9; j++) {
        arr[i][j] = 0;
      }
    }
    return arr;
  }

  /**
   * 获取n-m的随机整数
   * @param {} n
   * @param {} m
   * @return {}
   */
  function random(n: number, m: number) {
    var c = m - n + 1;
    return Math.floor(Math.random() * c + n);
  }

  /**
   * 检测行是否符合标准
   * @param {} arr
   * @param {} row
   * @return {Boolean}
   */
  function checkRow(arr: number[][], row: number) {
    for (var j = 0; j < 8; j++) {
      if (arr[row][j] === 0) {
        continue;
      }
      for (var k = j + 1; k < 9; k++) {
        if (arr[row][j] === arr[row][k]) {
          return false;
        }
      }
    }
    return true;
  }

  /**
   * 检测列是否符合标准
   * @param {} arr
   * @param {} col
   * @return {Boolean}
   */
  function checkLine(arr: number[][], col: number) {
    for (var j = 0; j < 8; j++) {
      if (arr[j][col] === 0) {
        continue;
      }
      for (var k = j + 1; k < 9; k++) {
        if (arr[j][col] === arr[k][col]) {
          return false;
        }
      }
    }
    return true;
  }

  /**
   * 检测3X3是否符合标准
   * @param {} arr
   * @param {} row
   * @param {} col
   * @return {Boolean}
   */
  function checkNine(arr: number[][], row: number, col: number) {
    // 获得左上角的坐标
    var j = Math.floor(row / 3) * 3;
    var k = Math.floor(col / 3) * 3;
    // 循环比较
    for (var i = 0; i < 8; i++) {
      if (arr[j + Math.floor(i / 3)][k + i % 3] === 0) {
        continue;
      }
      for (var m = i + 1; m < 9; m++) {
        if (arr[j + Math.floor(i / 3)][k + Math.round(i % 3)] === arr[j + Math.floor(m / 3)][k + Math.round(m % 3)]) {
          return false;
        }
      }
    }
    return true;
  }

  /**
   * 检查对角线是否符合标准(左上->右下)
   * @param {} arr
   * @param {} row
   * @param {} col
   */
  function checkDiagonalLeftToRight(arr: number[][], row: number, col: number) {
    if (row != col) {
      return true;
    }
    for (var i = 0; i < 8; i++) {
      if (i == row) {
        continue;
      }
      if (arr[i][i] == arr[row][col]) {
        return false;
      }
    }
    return true;
  }

  /**
   * 检查对角线是否符合标准(右上->左下)
   * @param {} arr
   * @param {} row
   * @param {} col
   */
  function checkDiagonalRightToLeft(arr: number[][], row: number, col: number) {
    if ((row + col) != 8) {
      return true;
    }
    for (var i = 0; i < 8; i++) {
      if (i == row) {
        continue;
      }
      if (arr[i][8 - i] == arr[row][col]) {
        return false;
      }
    }
    return true;
  }

  /**
   * 是否满足行、列和3X3区域不重复的要求
   * @param {} arr
   * @param {} row
   * @param {} col
   * @return {}
   */
  function isCorret(arr: number[][], row: number, col: number) {
    return (checkRow(arr, row) && checkLine(arr, col) && checkNine(arr, row, col));
  }

  /**
   * 生成1-9的随机整数
   * @return {}
   */
  function generateRandom() {
    return Math.floor(Math.random() * 9 + 1);
  }

  function generateShuDu() {
    const start = Date.now()
    var arr = generateArr();
    for (var i = 0; i < 9; i++) {
      var time = 0;
      for (var j = 0; j < 9; j++) {
        arr[i][j] = time === 9 ? 0 : generateRandom();
        if (arr[i][j] === 0) {// 不是第一列，则倒退一列
          if (j > 0) {
            j -= 2;
            continue;
          }
          else {// 是第一列，则倒退到上一行的最后一列
            i--;
            j = 8;
            continue;
          }
        }
        if (isCorret(arr, i, j)) {
          time = 0;// 初始化time，为下一次填充做准备
        }
        else {
          time++;// 次数增加1
          j--;// 继续填充当前格
        }
      }
    }
    const end = Date.now()
    setArr(arr)
    console.log(`total---${end - start}`)
    var result = "";
    for (var i = 0; i < 9; i++) {
      for (var j = 0; j < 9; j++) {
        result += arr[i][j];
      }
      result += "\n";
    }
    console.log(result);
  }
  const checkBtn = () => {
    generateShuDu()
  }

  return <div className="sudoku">
    <Button onClick={checkBtn}>checkBtn</Button>
    <div className="cont2">
      {arr.map((item: any, index: number) => {
        return <div key={index}>
          {item.map((jtem: any, jIndex: number) => {
            return <div key={jIndex} >
              {jtem}
              {/* <InputNumber style={{ width: '100%' }} min={1} max={9} step={1} defaultValue={jtem} value={jtem} onChange={(e: any) => onChange(index, jIndex, e)} /> */}
            </div>
          })}
        </div>
      })}

    </div >
  </div >
}

export default Sudoku2