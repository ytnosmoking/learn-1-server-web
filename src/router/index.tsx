

import LoadView from 'components/LoadAble'

export const routes = [
  {
    pathname: '/index',
    component: LoadView('Index'),
    meta: {
      title: '首页'
    }
  },
  {
    pathname: '/music',
    component: LoadView('Music'),
    meta: {
      title: 'Music'
    }
  },
  {
    pathname: '/set',
    component: LoadView('Set'),
    meta: {
      title: '设置'
    }
  },
  {
    pathname: '/about',
    redirect: '/about/why',
    component: LoadView('About'),
    meta: {
      title: 'About'
    },
    children: [
      {
        pathname: '/about/why',
        component: LoadView('About/why'),
        meta: {
          title: 'About - Why'
        }
      },
      {
        pathname: '/about/info',
        component: LoadView('About/info'),
        meta: {
          title: 'About - Info'
        }
      }
    ]
  },
  {
    pathname: '/grid',
    component: LoadView('Grid'),
    meta: {
      title: 'Grid'
    }
  }

]



export default {
  routes
}