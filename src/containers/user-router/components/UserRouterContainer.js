import React, {Component} from 'react'
import {Route} from 'react-router-dom'
import UserHomepageContainer from '../../user-homepage/components/UserHomepageContainer'
import TeachersContainer from '../../teachers/components/TeachersContainer'

class UserRouterContainer extends Component {
    render() {

        return (
            <div className="UserRouterContainer">
                <Route exact path="/user" component={UserHomepageContainer}/>
                <Route exact path="/user/teachers" component={TeachersContainer}/>
            </div>
        )
    }
}

export default UserRouterContainer
