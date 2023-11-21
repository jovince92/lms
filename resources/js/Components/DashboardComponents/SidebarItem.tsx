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
    const isActive = useMemo(()=> full_url===href || base_url.startsWith(href),[href,base_url,full_url] )
    const onClick = () =>{
        Inertia.get(href);
    }

    console.log([href,base_url]);


    return (
        <button onClick={onClick} type='button' className={cn(' flex items-center  gap-x-1.5 text-idcsi/80 text-sm font-[500] pl-5 transition-all hover:text-idcsi h-fit',
                isActive && ('bg-secondary')
            )}>
            <div className='flex items-center gap-x-2 py-3.5'>
                <Icon size={22} />
                {label}
            </div>
            <div className={cn('ml-auto opacity-0 border-2 border-idcsi h-full transition-all',
                    isActive && 'opacity-100'
                )} />
        </button>
    )
}

export default SidebarItem