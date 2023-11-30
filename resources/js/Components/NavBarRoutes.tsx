import React from 'react'
import UserButton from './UserButton'
import { Link, usePage } from '@inertiajs/inertia-react';
import { PageProps } from '@/types';
import { Inertia, Page } from '@inertiajs/inertia';
import { Button } from './ui/button';
import { LogOut, Search } from 'lucide-react';
import { ModeToggle } from './ModeToggle';
import SearchInput from './SearchInput';

const NavBarRoutes = () => {
    const {base_url} = usePage<Page<PageProps>>().props;
    const {user} = usePage<Page<PageProps>>().props.auth;
    
    const isTeacherPage = base_url.includes('/teacher');
    const isPlayerPage = route().current()?.includes('course.');
    const isSearchPage = base_url.includes('/search');

    const backLabel = isTeacherPage?'Exit Teacher Mode':'Go Back';

    const enterTeacherModeLink = user.level===3?null:<Link  href={route('teacher.courses.index')} > <Button size='sm' variant='ddc'>Enter Teacher Mode</Button> </Link>;

    return (
        <>
            {isSearchPage &&(
                <div className='hidden md:block'>
                    <SearchInput />
                </div>
            )}
            
            <div className='flex gap-x-2 ml-auto items-center'>
                {
                    isTeacherPage || isPlayerPage ? <Button  size='sm' variant='ddc' onClick={()=>Inertia.get(route('dashboard.index'))}> <LogOut className='h-4 w-4 mr-2'/>{backLabel}</Button>: enterTeacherModeLink
                }
                <ModeToggle />
                <UserButton />
            </div>
        </>
    )
}

export default NavBarRoutes