import React, { FC } from 'react'
import Logo from './Logo'
import SideBarRoutes from './SideBarRoutes'
import { ModeToggle } from '../ModeToggle'
import { useTheme } from '@/Providers/ThemeProvider'

const Sidebar:FC = () => {
    const {theme}  = useTheme();
    return (
        <div className='h-full border-r flex flex-col overflow-y-auto bg-background shadow-sm'>
            
            <div className='p-6'>
                <Logo />
            </div>
            
            <div className='flex flex-col w-full'>
                <SideBarRoutes />
            </div>
        
            
        </div>
    )
}

export default Sidebar