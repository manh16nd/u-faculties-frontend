import React, {Component} from 'react'
import AppContext from '../../../AppContext'
import UserMenu from './UserMenu'

class UserMenuContainer extends Component {
    render() {

        return (
            <AppContext.Consumer>
                {(context) => <UserMenu
                    {...{
                        ...context,
                        ...this.props,
                    }}
                />}
            </AppContext.Consumer>
        )
    }
}

export default UserMenuContainer
