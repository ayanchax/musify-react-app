import React from 'react'
import './HeaderOption.css'
function HeaderOption({ title, Icon }) {
    return (
        <div className="headeroption">
            {Icon && <Icon className="headeroption__icon" />}
            {Icon ? <h4>{title}</h4> : <p>{title}</p>}
        </div>
    )
}

export default HeaderOption