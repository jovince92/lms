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
    
    const isTeacherPage = base_url.includes('/teacher')||base_url.includes('/admin');
    const isPlayerPage = route().current()?.includes('course.');
    const isSearchPage = base_url.includes('/search');

    const backLabel = isTeacherPage? user.level===0? 'Exit Admin Mode':'Exit Teacher Mode' :'Go Back';
    const enterLabel = user.level===0?'Enter Admin Mode':'Enter Teacher Mode';

    const enterTeacherModeLink = user.level===3?null:<Link  href={route('teacher.courses.index')} > <Button size='sm' variant='ddc'>{enterLabel}</Button> </Link>;

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
                <UserButton className='h-10 w-10' />
            </div>
        </>
    )
}

export default NavBarRoutes