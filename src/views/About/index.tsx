import React, { FC, useState, useMemo } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import { Button } from 'antd'
import { routes } from 'router/index'


const About: FC = (props: any) => {
  const [baseRoute] = useState(routes || [])
  console.log(props)
  const getRoutes = useMemo(() => {
    const arr = baseRoute.filter(route => route.pathname === props.match.path)
    if (arr.length > 0) {
      return arr[0].children || []
    }
    return []
  }, [baseRoute, props.match.path])
  const testBtn = useMemo(() => {
    console.log(111)
    return <Button type="primary">this is About</Button>
  }, [])

  return <div style={{ backgroundColor: 'pink' }}>

    {testBtn}
    <br />

    <Switch >
      {getRoutes.map(route => {
        return <Route key={route.pathname} path={route.pathname}
          // @ts-ignore
          component={route.component}></Route>
      })}

    </Switch>
  </div>
}

export default About