import React, { FC, useState } from 'react';

import './Sudoku.less'



const randomIndex = (max: number) => Math.floor(Math.random() * max)

const base = [1, 2, 3, 4, 5, 6, 7, 8, 9]
// interface arrKey {

//   [key: string | number]: any
// }
const Sudoku: FC = () => {
  const [arr] = useState([...Array(9).fill(1).map(((item, index) => {
    let arr = [...base];
    return Array(9).fill(1).map((jtem, jndex) => {
      return arr.splice(randomIndex(arr.length), 1)[0]
    })
  }))])

  return <div className="sudoku">
    <div className="cont">
      {arr.map((item: any, index: number) => {
        return <div key={index}>
          {item.map((jtem: any, jIndex: number) => {
            return <div key={jIndex} style={{}}>
              {jtem}
              {/* <InputNumber style={{ width: '100%' }} min={1} max={9} step={1} defaultValue={jtem} value={jtem} onChange={(e: any) => onChange(index, jIndex, e)} /> */}
            </div>
          })}
        </div>
      })}

    </div >
  </div >
}

export default Sudoku