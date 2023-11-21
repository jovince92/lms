import React from 'react'

const Logo = () => {
    return (
        <img height={130} width={130} alt='Logo' src={`${route('public_route')}/logo/logo.svg`}/>
    )
}

export default Logo