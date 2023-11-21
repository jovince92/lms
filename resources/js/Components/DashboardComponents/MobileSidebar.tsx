import { Menu } from 'lucide-react'
import React from 'react'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'
import Sidebar from './Sidebar'

const MobileSidebar = () => {
    return (
        <Sheet>
            <SheetTrigger className='md:hidden pr-3.5 hover:opacity-75 transition duration-300'>
                <Menu />
            </SheetTrigger>
            <SheetContent side='left' className='p-0 bg-background'>
                <Sidebar />
            </SheetContent>
        </Sheet>
    )
}

export default MobileSidebar