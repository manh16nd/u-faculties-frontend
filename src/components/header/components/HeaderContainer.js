import React, {Component} from 'react'
import Header from './Header'
import AppContext from '../../../AppContext'

class HeaderContainer extends Component {
    render() {

        return (
            <AppContext.Consumer>
                {(store) => <Header
                    {...{
                        ...store,
                        ...this.props,
                    }}
                />}
            </AppContext.Consumer>
        )
    }
}

export default HeaderContainer
