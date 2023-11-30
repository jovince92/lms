import SearchInput from '@/Components/SearchInput';
import Categories from '@/Components/SearchPageComponents/Categories';
import CoursesList from '@/Components/CoursesList';
import DashboardLayout from '@/Layouts/DashboardLayout'
import { Category, Course, PageProps } from '@/types';
import { Page } from '@inertiajs/inertia';
import { Head, usePage } from '@inertiajs/inertia-react';
import React, { FC } from 'react'
import { ScrollArea } from '@/Components/ui/scroll-area';


interface Props{
    selected_categories:Category[];
    courses:Course[]
}



const SearchPage:FC<Props> = ({selected_categories,courses}) => {
    return (
        <>
            <Head title='Browse Courses' />
            <DashboardLayout className='overflow-y-hidden'>
                <>
                    <div className='px-5 p-6 md:hidden md:mb-0 block'>
                        <SearchInput />
                    </div>
                    <div className='p-5 flex flex-col space-y-3.5 h-full overflow-y-hidden'>
                        <div className='h-auto'>
                            <Categories selected_categories={selected_categories} />
                        </div>
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