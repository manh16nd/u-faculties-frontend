import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import UserHomepageContainer from '../../user-homepage/components/UserHomepageContainer'
import TeachersContainer from '../../teachers/components/TeachersContainer'
import AdminDepartmentsContainer from '../../admin-departments/components/AdminDepartmentsContainer'

class UserRouterContainer extends Component {
    render() {

        return (
            <div className="UserRouterContainer">
                <Route exact path="/user" component={UserHomepageContainer} />
                <Route exact path="/user/teachers" component={TeachersContainer} />
                <Route exact path="/user/departments" component={AdminDepartmentsContainer} />
            </div>
        )
    }
}

export default UserRouterContainer
