import Categories from '@/Components/SearchPageComponents/Categories';
import DashboardLayout from '@/Layouts/DashboardLayout'
import { Category, PageProps } from '@/types';
import { Page } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/inertia-react';
import React, { FC } from 'react'


interface Props{
    selected_categories:Category[];
}

const SearchPage:FC<Props> = ({selected_categories}) => {
    return (
        <DashboardLayout>
            <div className='p-5'>
                <Categories selected_categories={selected_categories} />
            </div>
        </DashboardLayout>
    )
}

export default SearchPage