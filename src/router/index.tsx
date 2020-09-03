

import LoadView, { LoadComponent } from 'components/LoadAble'

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
    // component: LoadView('Set'),
    component: LoadComponent('Switch'),
    meta: {
      title: '设置'
    },
    redirect: '/set/userinfo',
    children: [
      {
        pathname: '/set/userinfo',
        component: LoadView('Set/userInfo'),
        meta: {
          title: '用户信息'
        }
      },]
  },
  {
    pathname: '/about',
    redirect: '/about/why',
    component: LoadComponent('Switch'),
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
  },
  {
    pathname: '/button',
    component: LoadView('Button'),
    meta: {
      title: 'Button'
    }
  },
  {
    pathname: '/game',
    component: LoadComponent('Switch'),
    meta: {
      title: 'Game'
    },
    children: [
      {
        pathname: '/game/sudoku',
        component: LoadView('Game/Sudoku'),
        meta: {
          title: 'Game - 数独'
        }
      },
      {
        pathname: '/game/sudoku-2',
        component: LoadView('Game/Sudoku2'),
        meta: {
          title: 'Game - 完成'
        }
      },
      {
        pathname: '/game/sudoku-3',
        component: LoadView('Game/Sudoku3'),
        meta: {
          title: 'Game - 数独3'
        }
      },
      {
        pathname: '/game/move-image',
        component: LoadView('Game/MoveImage'),
        meta: {
          title: 'Game - 切割移动图片'
        }
      },
    ]
  },
  {
    pathname: '/mock',
    component: LoadComponent('Switch'),
    redirect: '/mock/img',
    meta: {
      title: 'MOCK'
    },
    children: [
      {
        pathname: '/mock/img',
        component: LoadView('Mock/MockImg'),
        meta: {
          title: 'Mock - 图片'
        }
      },
    ]
  },

]



export default {
  routes
}