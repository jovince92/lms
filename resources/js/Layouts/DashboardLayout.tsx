import Navbar from '@/Components/DashboardComponents/Navbar';
import Sidebar from '@/Components/DashboardComponents/Sidebar';
import ConfettiProvider from '@/Providers/ConfettiProvider';
import React, { FC, ReactNode } from 'react'

interface Props{
    children:ReactNode;
}

const DashboardLayout:FC<Props> = ({children}) => {
    return (
        <>
            <ConfettiProvider />
            <div className='h-full'>
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