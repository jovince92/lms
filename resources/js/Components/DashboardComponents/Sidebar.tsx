import React, { FC } from 'react'
import Logo from './Logo'
import SideBarRoutes from './SideBarRoutes'
import { ModeToggle } from '../ModeToggle'

const Sidebar:FC = () => {
    return (
        <div className='h-full border-r flex flex-col overflow-y-auto bg-background shadow-sm'>
            <div className='p-6'>
                <Logo />
            </div>
            <div className='flex flex-col w-full'>
                <SideBarRoutes />
            </div>
            <div className='mt-auto'>
                <ModeToggle />
            </div>
            
        </div>
    )
}

export default Sidebar