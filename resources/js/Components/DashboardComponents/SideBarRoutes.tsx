import { BarChart2, Compass, Layout, List, LucideIcon } from 'lucide-react'
import React, { useMemo } from 'react'
import SidebarItem from './SidebarItem';
import { usePage } from '@inertiajs/inertia-react';
import { Page } from '@inertiajs/inertia';
import { PageProps } from '@/types';

export type SideBarRoute = {
    icon: LucideIcon;
    label: string;
    href: string;
}

const studentRoutes:SideBarRoute[] = [
    {
        icon: Layout,
        label:'Dashboard',
        href: route('dashboard.index')
    },{
        icon: Compass,
        label:'Browse',
        href: route('search.index')
    }
];

const teacherRoutes:SideBarRoute[]=[
    {
        icon: List,
        label:'Courses',
        href: route('teacher.courses.index')
    },{
        icon: BarChart2,
        label:'Analytics',
        href: route('teacher.analytics')
    }
]

const SideBarRoutes = () => {
    
    const {base_url} = usePage<Page<PageProps>>().props;

    const routes = useMemo(()=>base_url.includes('teacher')?teacherRoutes:studentRoutes,[base_url]);

    return (
        <div className='flex flex-col w-full'>
            {
                routes.map(r=><SidebarItem key={r.label} item={r} />)
            }
        </div>
    )
}

export default SideBarRoutes