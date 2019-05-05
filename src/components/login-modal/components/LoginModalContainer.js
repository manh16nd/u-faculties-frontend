import React, {Component} from 'react'
import AppContext from '../../../AppContext'
import LoginModal from './LoginModal'

class LoginModalContainer extends Component {
    render() {

        return (
            <AppContext.Consumer>
                {(context) => <LoginModal
                    {...{
                        ...context,
                        ...this.props,
                    }}
                />}
            </AppContext.Consumer>
        )
    }
}

export default LoginModalContainer
