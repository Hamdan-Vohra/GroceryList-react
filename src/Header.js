import React from 'react'

const Header = ({ title }) => {

    return (
        <header>
            <h1>
                {title}
            </h1>
        </header>
    )
}

//This is not available in latest react
// Header.defaultProps = {
//     title: 'Default Title'
// }
export default Header