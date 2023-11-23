import React from 'react'

const Logo = () => {
    return (
        <div className='flex flex-col items-center justify-center'>
            <img height={130} width={130} alt='Logo' src={`${route('public_route')}/logo/logo.png`}/>
            <p className='text-xs text-idcsi font-semibold tracking-wide'>Learning Management</p>
            <p className='text-xs text-idcsi font-semibold tracking-wide'>System</p>
        </div>
    )
}

export default Logo