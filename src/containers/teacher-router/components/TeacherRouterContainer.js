import React from 'react'
import { Switch, Route } from 'react-router-dom'
import TeacherInfoContainer from '../../teacher-info/components/TeacherInfoContainer'
import TeacherHomepageContainer from '../../teacher-homepage/components/TeacherHomepageContainer'

const TeacherRouterContainer = function (props) {
    return (
        <div className="TeacherRouterContainer">
            <Switch>
                <Route exact path='/user' component={TeacherHomepageContainer} />
                <Route exact path='/info' component={TeacherInfoContainer} />
            </Switch>
        </div>
    )
}

export default TeacherRouterContainer