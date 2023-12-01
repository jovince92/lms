import { BarChart2, Blocks, Compass, Heart, Layout, List, LucideIcon, User, Users2 } from 'lucide-react'
import React, { useMemo } from 'react'
import SidebarItem from './SidebarItem';
import { usePage } from '@inertiajs/inertia-react';
import { Page } from '@inertiajs/inertia';
import { PageProps } from '@/types';
import { Separator } from '../ui/separator';

export type SideBarRoute = {
    icon: LucideIcon;
    label: string;
    href: string;
}

const studentRoutes:SideBarRoute[] = [
    {
        icon: Layout,
        label:'My Dashboard',
        href: 'dashboard.index'
    },{
        icon: Compass,
        label:'Browse',
        href: 'search.index'
    }
];

const teacherRoutes:SideBarRoute[]=[
    {
        icon: List,
        label:'My Courses',
        href: 'teacher.courses'
    },{
        icon: BarChart2,
        label:'Analytics',
        href: 'teacher.analytics'
    }
];

const defaultRoutes:SideBarRoute[]=[{
        icon:User,
        label:'Profile',
        href:'profile.index'
    },{
        icon:Heart,
        label:'My Favorites',
        href:'favorites.index'
    }

]

const adminRoutes:SideBarRoute[]=[
    {
        icon:Blocks,
        label:'Categories',
        href:'categories.index',
    },
    {
        icon:Users2,
        label:'All Users',
        href:"#",
    }
];

const SideBarRoutes = () => {
    
    const {user} = usePage<Page<PageProps>>().props.auth;
    const {base_url} = usePage<Page<PageProps>>().props;

    const routes = useMemo(()=>base_url.includes('teacher')?teacherRoutes:studentRoutes,[base_url]);

    return (
        <>
            <div className='flex flex-col w-full'>
                {
                    [...routes,...defaultRoutes].map(r=><SidebarItem key={r.label} item={r} />)
                }
            </div>
            {
                user.level===0&&(
                    <div className='flex flex-col w-full'>
                        <Separator />
                        <p className='font-bold tracking-tight text-lg px-3.5 text-idcsi my-2.5'> Site Settings </p>
                        {
                            adminRoutes.map(r=><SidebarItem key={r.label} item={r} />)
                        }
                    </div>
                )
            }
        </>
    )
}

export default SideBarRoutes