import React, { FC, useMemo } from 'react';
import { SideBarRoute } from './SideBarRoutes';

import { Inertia, Page } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/inertia-react';
import { PageProps } from '@/types';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
interface Props{
    item:SideBarRoute;
}

const SidebarItem:FC<Props> = ({item}) => {
    
    const {base_url,full_url} = usePage<Page<PageProps>>().props;
    const {href,label,icon:Icon} = item;
    const isActive = useMemo(()=> full_url===href || base_url.startsWith(`${href}/ `),[href,base_url,full_url] )
    const onClick = () =>{
        Inertia.get(href);
    }
    return (
        <button onClick={onClick} type='button' className={cn(' flex items-center  gap-x-1.5 text-primary/80 text-sm font-[500] pl-5 transition-all hover:text-primary h-fit',
                isActive && ('text-sky-900 dark:text-sky-100 bg-sky-100 dark:bg-sky-900')
            )}>
            <div className='flex items-center gap-x-2 py-3.5'>
                <Icon size={22} />
                {label}
            </div>
            <div className={cn('ml-auto opacity-0 border-2 border-sky-500 dark:border-sky-400 h-full transition-all',
                    isActive && 'opacity-100'
                )} />
        </button>
    )
}

export default SidebarItem