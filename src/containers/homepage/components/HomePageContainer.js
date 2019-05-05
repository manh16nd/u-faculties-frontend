import React, {Component} from 'react'
import HomePage from './HomePage'

class HomePageContainer extends Component {
    render() {

        return (
            <div className="HomePageContainer">
                <HomePage {...this.props}/>
            </div>
        )
    }
}

export default HomePageContainer
