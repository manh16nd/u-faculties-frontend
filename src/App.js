import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import HomePageContainer from './containers/homepage/components/HomePageContainer'

import HeaderContainer from './components/header/components/HeaderContainer'
import LoginModalContainer from './components/login-modal/components/LoginModalContainer'

import { getCookie } from './services/cookies'
import AppContext from './AppContext'
import { verifyUser } from './services/api/AuthServices'
import UserRouterContainer from './containers/user-router/components/UserRouterContainer'
import TeacherRouterContainer from './containers/teacher-router/components/TeacherRouterContainer'
import HomepageTeacherContainer from './containers/homepage-teacher/components/HomepageTeacherContainer'
import NewUserContainer from './containers/new-user/components/NewUserContainer';

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
        const type = (user.type === 'admin' || user.type === 'staff') ? 'admin' : (user.type === 'teacher') ? 'teacher' : null

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
                        <Route exact path='/teacher-info/:id' component={HomepageTeacherContainer} />
                        <Route exact path='/newUser' component={NewUserContainer} />
                        {user.token && type === 'admin' && <UserRouterContainer />}
                        {user.token && type === 'teacher' && <TeacherRouterContainer />}
                        <Redirect from='*' to='/' />
                    </Switch>
                </div>
            </AppContext.Provider>
        )
    }
}

export default App
