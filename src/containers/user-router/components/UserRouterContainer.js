import React, {Component} from 'react'
import {Route} from 'react-router-dom'
import UserHomepageContainer from '../../user-homepage/components/UserHomepageContainer'
import TeachersContainer from '../../teachers/components/TeachersContainer'
import ChangePasswordContainer from '../../change-password/components/ChangePasswordContainer'
import InputExcelContainer from '../../input-excel/components/InputExcelContainer'


class UserRouterContainer extends Component {
    render() {

        return (
            <div className="UserRouterContainer">
                <Route exact path="/user" component={UserHomepageContainer}/>
                <Route exact path="/user/teachers" component={TeachersContainer}/>
                <Route exact path='/changePassword' component={ChangePasswordContainer} />
                <Route exact path='/inputExcel' component={InputExcelContainer} />
            </div>
        )
    }
}

export default UserRouterContainer
