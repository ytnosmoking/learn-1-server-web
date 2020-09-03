import React, { memo, FC, useCallback, useMemo, useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Menu, Tooltip } from 'antd'
import { routes } from 'router/index'

const { SubMenu } = Menu

const SiderBar: FC = (props: any) => {
  const [sideRoutes] = useState(routes || [])
  const generateRoute = useCallback((routes: any[]) => {
    console.log('generateRoute')
    return routes.map((route: any) => {
      if (route.children) {
        return <SubMenu key={route.pathname} title={route.meta.title}>
          {generateRoute(route.children)}
        </SubMenu>
      }
      return <Menu.Item key={route.pathname}>


        {/* <Tooltip placement="right" color="#000" title={
          <span style={{ color: '#fff' }}>
            {route.meta.title}
          </span>
        }> */}
        <Link to={route}>
          {route.meta.title}

        </Link>
        {/* </Tooltip> */}

      </Menu.Item>
    })
  }, [])

  const getterRoutes = useMemo(() => {
    return generateRoute(sideRoutes)
  }, [generateRoute, sideRoutes])

  return <Menu mode="inline"
    theme="dark"
    selectedKeys={[props.location.pathname]}
  >
    {getterRoutes}
  </Menu>
}


export default memo(withRouter(SiderBar))