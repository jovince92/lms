import SearchInput from '@/Components/SearchInput';
import Categories from '@/Components/SearchPageComponents/Categories';
import CoursesList from '@/Components/CoursesList';
import DashboardLayout from '@/Layouts/DashboardLayout'
import { Category, Course, PageProps, User } from '@/types';
import { Page } from '@inertiajs/inertia';
import { Head, usePage } from '@inertiajs/inertia-react';
import React, { FC } from 'react'
import { ScrollArea } from '@/Components/ui/scroll-area';
import { Separator } from '@/Components/ui/separator';


interface Props{
    selected_categories:Category[];
    courses:Course[];
    user?:User;
}



const SearchPage:FC<Props> = ({selected_categories,courses,user}) => {
    return (
        <>
            <Head title='Browse Courses' />
            <DashboardLayout className='overflow-y-hidden'>
                <>
                    <div className='px-5 p-6 md:hidden md:mb-0 block'>
                        <SearchInput />
                    </div>
                    <div className='p-5 flex flex-col space-y-3.5 h-full overflow-y-hidden'>
                        {
                            !user?(
                                <div className='h-auto'>
                                    <Categories selected_categories={selected_categories} />
                                </div>
                            ):(
                                <>
                                    <div className='tracking-tight text-lg'>
                                        Courses By: <span className=' font-semibold'> {user.first_name} {user.last_name} </span>
                                    </div>
                                    <Separator />
                                </>
                            )
                        }
                        
                        <div className='flex-1 overflow-y-auto'>
                            <CoursesList className='h-full ' courses={courses} />
                        </div>
                    </div>
                </>
            </DashboardLayout>
        </>
    )
}

export default SearchPage