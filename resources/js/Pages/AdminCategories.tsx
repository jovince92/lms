import { AdminCategoryColumns } from '@/Components/AdminCategoryComponents/AdminCategoryColumns';
import { DataTable } from '@/Components/DataTable';
import { Button } from '@/Components/ui/button';
import { useCategoryModal } from '@/Hooks/useCategoryModal';
import DashboardLayout from '@/Layouts/DashboardLayout'
import { PageProps } from '@/types';
import { Page } from '@inertiajs/inertia';
import { Head, usePage } from '@inertiajs/inertia-react'
import React from 'react'

const AdminCategories = () => {
    const {categories} = usePage<Page<PageProps>>().props;
    const {onOpen} = useCategoryModal();
    return (
        <>
            <Head title='Modify Categories' />
            <DashboardLayout className='overflow-y-hidden'>
                <>
                    <div className='p-5 flex flex-col space-y-3.5 h-full overflow-y-hidden'>
                        <div className='h-auto flex items-center justify-between'>
                            <p className='font-bold tracking-tight text-xl'>Modify Categories</p>
                            <Button onClick={()=>onOpen()} size='sm'>New Category</Button>
                        </div>
                        <div className='flex-1 overflow-y-auto'>
                            <DataTable columns={AdminCategoryColumns} data={categories} />
                        </div>
                    </div>
                </>
            </DashboardLayout>
        </>
    )
}

export default AdminCategories