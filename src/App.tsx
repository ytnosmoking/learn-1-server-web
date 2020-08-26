import React, { useReducer, FC, memo } from 'react'

import Layout from 'components/Layout';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import { TokenContext, DispatchContext } from "utils/context";
import { getItem, setItem } from 'utils/tools'
import './mock'

type action = {
  type: string
  val: string
}
const changeToken = (state: {} = getItem('info'), action: action) => {
  const { type } = action
  if (type === 'logout') {
    setItem('info', {})
    return {}
  }
  if (type === 'login') {
    console.log(action)
    setItem('info', action.val)
    return action.val
  }
  return state
}
const App: FC = () => {
  const [state, dispatch] = useReducer(changeToken, getItem('info'))

  return (
    <TokenContext.Provider value={state}>
      <DispatchContext.Provider
        value={dispatch}>
        {/* {TransRoute} */}
        <Layout
          //@ts-ignore
          info={state} />
      </DispatchContext.Provider>
    </TokenContext.Provider>
  );
}

export default memo(App)
