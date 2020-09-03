import React, { FC, useState, useMemo } from 'react';
import { Switch, Route } from 'react-router-dom'

import { routes } from 'router/index'


const SwitchView: FC = (props: any) => {
  const [baseRoute] = useState(routes || [])
  console.log(props)
  const getRoutes = useMemo(() => {
    const arr = baseRoute.filter(route => route.pathname === props.match.path)
    if (arr.length > 0) {
      return arr[0].children || []
    }
    return []
  }, [baseRoute, props.match.path])


  return <Switch >
    {getRoutes.map(route => {
      return <Route key={route.pathname} path={route.pathname}
        // @ts-ignore
        component={route.component}></Route>
    })}

  </Switch>

}

export default SwitchView