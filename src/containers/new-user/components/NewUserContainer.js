import React from 'react'
import NewUser from './NewUser'

const NewUserContainer = function (props) {

    return (
        <div className="NewUserContainer">
            <NewUser {...props} />
        </div>
    )
}

export default NewUserContainer