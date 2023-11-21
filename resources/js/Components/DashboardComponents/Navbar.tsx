import React from 'react'
import MobileSidebar from './MobileSidebar'
import NavBarRoutes from '../NavBarRoutes'

const Navbar = () => {
    return (
        <div className='p-3.5 border-b h-full flex items-center bg-background shadow-sm'>
            <MobileSidebar />
            <NavBarRoutes />
        </div>
    )
}

export default Navbar