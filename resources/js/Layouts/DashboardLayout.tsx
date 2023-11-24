import Navbar from '@/Components/DashboardComponents/Navbar';
import Sidebar from '@/Components/DashboardComponents/Sidebar';
import ConfettiProvider from '@/Providers/ConfettiProvider';
import { cn } from '@/lib/utils';
import React, { FC, ReactNode } from 'react'

interface Props{
    children:ReactNode;
    className?:string;
}

const DashboardLayout:FC<Props> = ({children,className}) => {
    return (
        <>
            <ConfettiProvider />
            <div className={cn('h-full',className)}>
                <div className='h-[5rem] md:pl-56 fixed inset-y-0 w-full z-50'>
                    <Navbar />
                </div>
                <div className='hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50'>
                    <Sidebar />
                </div>
                <main className='md:pl-56 pt-[5rem] h-full'>
                    {children}
                </main>
            </div>
        </>
    )
}

export default DashboardLayout;