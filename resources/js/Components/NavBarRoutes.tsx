import React from 'react'
import UserButton from './UserButton'
import { Link, usePage } from '@inertiajs/inertia-react';
import { PageProps } from '@/types';
import { Inertia, Page } from '@inertiajs/inertia';
import { Button } from './ui/button';
import { LogOut } from 'lucide-react';
import { ModeToggle } from './ModeToggle';

const NavBarRoutes = () => {
    const {base_url,full_url} = usePage<Page<PageProps>>().props;
    const isTeacherPage = base_url.includes('/teacher');
    const isPlayerPage = base_url.includes('/chapter');

    return (
        <div className='flex gap-x-2 ml-auto items-center'>
            {
                isTeacherPage || isPlayerPage ? <Button className='text-idcsi' size='sm' variant='outline' onClick={()=>Inertia.get(route('dashboard.index'))}> <LogOut className='h-4 w-4 mr-2'/>Exit </Button>: <Link className='text-idcsi' href={route('teacher.courses.index')} > <Button size='sm' variant='outline'>Teacher Mode</Button> </Link>
            }
            <ModeToggle />
            <UserButton />
        </div>
    )
}

export default NavBarRoutes