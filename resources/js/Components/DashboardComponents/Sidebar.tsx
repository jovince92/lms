import React, { FC } from 'react'
import Logo from './Logo'
import SideBarRoutes from './SideBarRoutes'
import { ModeToggle } from '../ModeToggle'
import { useTheme } from '@/Providers/ThemeProvider'
import { Link } from '@inertiajs/inertia-react'

const Sidebar:FC = () => {
    const {theme}  = useTheme();
    return (
        <div className='h-full border-r flex flex-col overflow-y-auto bg-background shadow-sm'>
            <Link href={route('dashboard.index')} className='p-2'>
                <Logo />
            </Link>
            
            <div className='flex flex-col w-full'>
                <SideBarRoutes />
            </div>
        
            
        </div>
    )
}

export default Sidebar