import React, {Component} from 'react'
import AppContext from './AppContext'
import HeaderContainer from './components/header/components/HeaderContainer'
import {Switch, Route} from 'react-router-dom'
import HomePageContainer from './containers/homepage/components/HomePageContainer'
import LoginModalContainer from './components/login-modal/components/LoginModalContainer'

class App extends Component {
    state = {
        user: {}
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
