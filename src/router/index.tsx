

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
    component: LoadView('Game'),
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
          title: 'Game - 数独2'
        }
      },
      {
        pathname: '/game/sudoku-3',
        component: LoadView('Game/Sudoku3'),
        meta: {
          title: 'Game - 数独3'
        }
      }
    ]
  }

]



export default {
  routes
}