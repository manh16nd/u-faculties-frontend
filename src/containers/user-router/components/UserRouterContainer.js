import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import UserHomepageContainer from '../../user-homepage/components/UserHomepageContainer'
import TeachersContainer from '../../teachers/components/TeachersContainer'
import AdminDepartmentsContainer from '../../admin-departments/components/AdminDepartmentsContainer'
import ChangePasswordContainer from '../../change-password/components/ChangePasswordContainer'
import InputExcelContainer from '../../input-excel/components/InputExcelContainer'
import UserFieldsContainer from '../../user-fields/components/UserFieldsContainer'


class UserRouterContainer extends Component {
    render() {

        return (
            <div className="UserRouterContainer">
                <Route exact path="/user" component={UserHomepageContainer} />
                <Route exact path="/user/teachers" component={TeachersContainer} />
                <Route exact path="/user/departments" component={AdminDepartmentsContainer} />
                <Route exact path="/user/fields" component={UserFieldsContainer} />
                <Route exact path='/user/changePassword' component={ChangePasswordContainer} />
                <Route exact path='/user/inputExcel' component={InputExcelContainer} />

            </div>
        )
    }
}

export default UserRouterContainer
