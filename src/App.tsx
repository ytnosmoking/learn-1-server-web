import React, { useReducer, FC, memo } from 'react'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import Login from 'views/Login'
import Layout from 'components/Layout';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import { TokenContext, DispatchContext } from "utils/context";
import { getItem, setItem } from 'utils/tools'

type action = {
  type: string
  val: string
}

const App: FC = (props: any) => {
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

  const [state, dispatch] = useReducer(changeToken, getItem('info'))
  // console.log(props)
  // // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const { location, history } = props
  // // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const ANIMATION_MAP = {
    PUSH: 'forward',
    POP: 'back'
  }
  return (
    <TokenContext.Provider value={state}>
      <DispatchContext.Provider
        value={dispatch}>
        <Route render={({ location, history }) => {
          console.log(location);
          console.log(history);
          return (
            <TransitionGroup className="h100 trans-cont"
            // childFactory={child => React.cloneElement(
            //   child,
            //   // @ts-ignore
            //   { classNames: ANIMATION_MAP[history.action] }
            // )}
            >
              <CSSTransition
                timeout={10000}
                classNames="fade"
                //@ts-ignore

                key={location.key}
              >
                <Switch >
                  <Route path="/login" component={Login} ></Route>
                  <Route path="/index" component={Layout} ></Route>

                  <Redirect from="*" to={
                    // @ts-ignore
                    state?.token ? '/index' : '/login'}></Redirect>
                </Switch>
              </CSSTransition>
            </TransitionGroup>
          )
        }}>
        </Route>
      </DispatchContext.Provider>
    </TokenContext.Provider>
  );
}

export default App
