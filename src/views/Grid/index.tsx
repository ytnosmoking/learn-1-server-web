import React, { FC } from 'react';
import { Button, Tabs } from 'antd'
import './index.less'
const { TabPane } = Tabs


const Grid: FC = () => {
  return <div className="grid" style={{ backgroundColor: 'lightblue' }}>
    this is Grid
    <hr />
    <Button></Button>
    <Tabs defaultActiveKey="1" >
      <TabPane tab="Tab 1" key="1">
        <div className="wrapper">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </TabPane>
      <TabPane tab="Tab 2" key="2">
        Content of Tab Pane 2
    </TabPane>
      <TabPane tab="Tab 3" key="3">
        Content of Tab Pane 3
    </TabPane>
    </Tabs>
  </div>
}

export default Grid