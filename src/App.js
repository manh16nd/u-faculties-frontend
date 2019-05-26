import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import HomePageContainer from './containers/homepage/components/HomePageContainer'

import HeaderContainer from './components/header/components/HeaderContainer'
import LoginModalContainer from './components/login-modal/components/LoginModalContainer'

import { getCookie } from './services/cookies'
import AppContext from './AppContext'
import { verifyUser } from './services/api/AuthServices'
import UserRouterContainer from './containers/user-router/components/UserRouterContainer'
import TeacherRouterContainer from './containers/teacher-router/components/TeacherRouterContainer';

class App extends Component {
    state = {
        user: {
            username: getCookie('username'),
            type: getCookie('type'),
            token: getCookie('token'),
        }
    }

    componentDidMount() {
        if (this.state.user.token) return this._fetchUserInfo()
    }

    _fetchUserInfo = async () => {
        const { user } = this.state
        const { success, data } = await verifyUser()
        if (success) {
            this.setState({
                user: { ...user, ...data }
            })
        }
    }

    changeState = (changedState) => {
        this.setState(changedState)
    }

    render() {
        const { state, changeState } = this
        const { user } = this.state

        return (
            <AppContext.Provider
                value={{
                    app: state,
                    changeState
                }}
            >
                <HeaderContainer />
                <LoginModalContainer />

                <div className="container-fluid">
                    <Switch>
                        <Route exact path='/' component={HomePageContainer} />
                        {user.token && user.type === 'admin' && <UserRouterContainer />}
                        {user.token && user.type === 'teacher' && <TeacherRouterContainer />}
                        <Redirect from='*' to='/' />
                    </Switch>
                </div>
            </AppContext.Provider>
        )
    }
}

export default App
