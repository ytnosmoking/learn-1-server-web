import React, { FC, useContext, useCallback, memo, useMemo, useState, useEffect } from 'react';
import SiderBar from 'components/SiderBar'
import { Layout, Button, message, Tooltip, Image } from 'antd';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { LeftOutlined, RightOutlined, DownOutlined, UpOutlined, LogoutOutlined, CloseOutlined, CloseCircleOutlined } from '@ant-design/icons'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { DispatchContext, TokenContext } from 'utils/context'
import Login from 'views/Login'
import { postData } from "utils/service";
import { API } from 'config/url'
import { routes } from 'router/index'
import { setItem, getItem } from 'utils/tools'
import './index.less'


const { Header, Sider, Content } = Layout;
type Props = {
  info: any
}

const Base: FC = (props: any | Props) => {
  const [info, setInfo] = useState<any>(useContext(TokenContext))
  // const [info, setInfo] = useState<any>(props.info)
  const [isCollapsed, setisCollapsed] = useState(true)
  const [histroyOpen, setHistroyOpen] = useState(false)
  const dispatch = useContext(DispatchContext)
  const [hisRoute, setHisRoute] = useState<any[]>(getItem('routes') || [])

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [Animation, setAnimation] = useState({
    PUSH: 'back',
    POP: 'forward'
  })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const logOut = () => {
    console.log(1)
    dispatch({ type: "logout" })
    props.history.push({ pathname: '/login' })
  }


  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const getInfos = async () => {
    const res: any = await postData(API.infos)
    console.log(res)
    if (res.status !== 200) {
      logOut()
      return message.error(res.message)
    }
    setInfo({ ...info, ...res.info })
  }

  const toggleSideBar = useCallback(
    () => {
      console.log(1)
      setisCollapsed(!isCollapsed)
    },
    [isCollapsed])

  //缓存用户信息 
  const userInfo = useMemo(() => {
    if (!info.token) {
      return ''
    }
    return <Header className="header" >
      <div>
        <span>{info?.nickname}</span>
      </div>
      <div>
        {/* <img src={info?.avator} alt="" /> */}
        <Image src={info?.avator} />
        <Button danger type="primary" onClick={logOut}
          icon={<LogoutOutlined />}
        > 退出</Button>
      </div>
    </Header>
  }, [info, logOut])

  // 路由 侧边
  const siderRoute = useMemo(() => {
    if (info.token) {
      return <Sider className={`layout-sider ${isCollapsed || 'isHide'}`}>
        <SiderBar />
      </Sider>

    }
    return
  }, [info.token, isCollapsed])

  // 侧边栏 监听 关闭
  const siderControl = useMemo(() => {
    if (!info.token) {
      return ''
    }
    return <div className="sider ">
      <Button
        className="switch-sider" onClick={toggleSideBar}
        icon={isCollapsed ? <LeftOutlined className="animate-left" /> : <RightOutlined className="animate-right" />}>
      </Button>
    </div>

  }, [info.token, isCollapsed, toggleSideBar])

  // 历史栏
  const routeHistory = useMemo(() => {
    if (!info.token) {
      return
    }
    return <div className="history-cont">
      <div className={`history ${histroyOpen ? 'active' : ''}`}>
        {hisRoute.map((route: any, index: number) =>
          <Button key={index} onClick={() => {
            const isCur = route.pathname === props.location.pathname
            if (!isCur) {
              props.history.push(route)

            }
            // isBack ? props.history.goBack(route) : props.history.go(route)
          }}> {route?.meta?.title} <CloseOutlined onClick={(e) => {
            e.stopPropagation()
            const arr = [...hisRoute]
            arr.splice(index, 1)
            setItem('routes', arr)
            setHisRoute(arr)
          }} /></Button>
        )}
        <Button className="toggle-history" onClick={() => setHistroyOpen(!histroyOpen)} icon={histroyOpen ? <UpOutlined /> : <DownOutlined />}></Button>
      </div>
      {/* 关闭 历史 */}
      {hisRoute.length > 0 && histroyOpen && <Tooltip placement="bottomRight" title="清除地址栏">
        <CloseCircleOutlined className='close' onClick={() => {
          setItem('routes', [])
          setHisRoute([])
        }} />
      </Tooltip>
      }
      {/* <Button className="toggle-history" icon={<UpOutlined />}></Button> */}
    </div>
  }, [hisRoute, histroyOpen, info.token, props.history, props.location.pathname])

  //location 变化时 监听 是否token还有  没有 就跳转login
  useEffect(() => {
    console.log(props)
    const { info, location } = props
    const { pathname } = location
    if (pathname !== '/login') {
      if (location.meta) {
        const arr = [...hisRoute, location]
        setItem('routes', arr)
        setHisRoute(arr)
      }
      if (!info.token) {
        return props.history.push('/login')
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.location])

  // 监听 info 信息改变 
  useEffect(() => {
    setInfo(props.info)
  }, [props.info])

  return <Layout className="layout">
    {/* 路由侧边栏   */}
    {siderRoute}
    <Layout>
      {userInfo}
      <Content className="layout-content ">
        {/* 侧边栏  */}
        {siderControl}
        {/* 历史栏 */}
        {routeHistory}
        <TransitionGroup className="h100 trans-cont"
          childFactory={child => React.cloneElement(
            child,
            {
              classNames: props.location.pathname === '/login' ? 'fade' :
                // @ts-ignore
                Animation[props.history.action]
              // hisRoute.some(item => item.pathname === props.location.pathname) ? 'forward' : 'back'
            }
          )}
        >
          <CSSTransition
            timeout={1000}
            key={props.location.pathname}
          >
            <Switch location={props.location}>
              {/* <Switch > */}
              <Route path="/login" component={Login} ></Route>
              {routes.map((route, index) => {

                return <Route key={index} path={route.pathname}
                  // @ts-ignore
                  component={route.component}></Route>
              })}
              <Redirect from="*" to='/index'></Redirect>
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      </Content>
    </Layout>
  </Layout>
}

export default withRouter(memo((Base)))