import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import TeacherInfoContainer from '../../teacher-info/components/TeacherInfoContainer'
import TeacherHomepageContainer from '../../teacher-homepage/components/TeacherHomepageContainer'
import ChangePasswordContainer from '../../change-password/components/ChangePasswordContainer'
import TeacherFieldsContainer from '../../teacher-fields/components/TeacherFieldsContainer'
import TeacherTopicsContainer from '../../teacher-topics/components/TeacherTopicsContainer'

const TeacherRouterContainer = function (props) {
    return (
        <div className="TeacherRouterContainer">
            <Switch>
                <Route exact path='/user' component={TeacherHomepageContainer} />
                <Route exact path='/info' component={TeacherInfoContainer} />
                <Route exact path='/changePassword' component={ChangePasswordContainer} />
                <Route exact path='/teacher/fields' component={TeacherFieldsContainer} />
                <Route exact path='/teacher/topics' component={TeacherTopicsContainer} />
                <Redirect from='*' to='/' />
            </Switch>
        </div>
    )
}

export default TeacherRouterContainer