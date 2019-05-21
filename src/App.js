import React, {Component} from 'react'
import {Switch, Route} from 'react-router-dom'

import HomePageContainer from './containers/homepage/components/HomePageContainer'

import HeaderContainer from './components/header/components/HeaderContainer'
import LoginModalContainer from './components/login-modal/components/LoginModalContainer'

import {getCookie} from './services/cookies'
import AppContext from './AppContext'

class App extends Component {
    state = {
        user: {
            username: getCookie('username'),
            type: getCookie('type'),
            token: getCookie('token'),
        }
    }

    changeState = (changedState) => {
        this.setState(changedState)
    }

    render() {
        const {state, changeState} = this

        return (
            <AppContext.Provider
                value={{
                    app: state,
                    changeState
                }}
            >
                <HeaderContainer/>
                <LoginModalContainer/>

                <div className="container-fluid">
                    <Switch>
                        <Route exact path='/' component={HomePageContainer}/>
                    </Switch>
                </div>
            </AppContext.Provider>
        )
    }
}

export default App
