import TableColumnHead from '@/Components/AdminAllUsersComponents/TableColumnHead';
import UserItem from '@/Components/AdminAllUsersComponents/UserItem';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { Pagination, User } from '@/types'
import { Inertia } from '@inertiajs/inertia';
import { Head } from '@inertiajs/inertia-react';
import { ChevronLeftIcon, ChevronRightIcon, ChevronsLeft, ChevronsRight } from 'lucide-react';
import React, { FC, FormEventHandler, useRef, useState } from 'react'

type FIELD = keyof User;

interface PaginatedUsers extends Pagination{
    data:User[];
}

interface Props{
    users:PaginatedUsers
    per_page?:string;
    sort:FIELD;
    order:'asc'|'desc';
    filter:string;
    role:'3'|'2'|'0'
}


const AdminAllUsers:FC<Props> = ({users,per_page,sort,order,filter,role}) => {
    
    const input=useRef<HTMLInputElement>(null);
    const [val,setVal] = useState(filter||"");
    const [currentRole] = useState(role||"");
    const [perPage,setPerPage] = useState(per_page||"10");
    const [sortBy,setSortBy] = useState<{
        field:FIELD
        order:typeof order
    }>({field:sort,order});
    const onSubmit:FormEventHandler<HTMLFormElement> = (e) =>{
        e.preventDefault();
        handleFilter();
    }

    const handleFilter = (newPerPage?:string,sort?:typeof sortBy.field) =>{
        let newOrder = sortBy.order;
        if(newPerPage){
            setPerPage(perPage);
        }
        if(sort){
            newOrder=sortBy.order!=='asc'?'asc':'desc'
            setSortBy({field:sort,order:newOrder});
        }
        Inertia.get(route('users.index',{
            filter:val,
            perPage:newPerPage?newPerPage:perPage,
            sort:sort?sort:sortBy.field,
            order:sort?newOrder:sortBy.order,
            role:currentRole==='0'?"":currentRole
        }),{
            preserveScroll:true,
            preserveState:sort?true:false
        });
    }

    const onRoleChange = (selectedRole:typeof role) =>{
        Inertia.get(route('users.index',{
            filter,
            perPage:perPage,
            sort:sortBy.field,
            order:sortBy.order,
            role:selectedRole
        }),{
            preserveScroll:true,
        });
    }

    return (
        <>
            <Head title='All Users' />
            <DashboardLayout className='overflow-y-hidden'>
                <>
                    <div className='p-5 flex flex-col space-y-3.5 h-full overflow-y-hidden'>
                        <div className='h-auto flex items-center justify-between'>
                            <p className='font-bold tracking-tight text-xl'>All Registered Users</p>
                        </div>
                        <div className='flex-1 overflow-y-auto relative flex'>
                            <Table >
                                <TableHeader className='sticky top-0 z-50 bg-background'>
                                    <TableRow className='-mt-0.5 z-50 text-sm'>
                                        <TableHead> <TableColumnHead >Avatar</TableColumnHead> </TableHead>
                                        <TableHead> <TableColumnHead onClick={()=>handleFilter(perPage,'company_id')}>Company ID</TableColumnHead> </TableHead>
                                        <TableHead> <TableColumnHead onClick={()=>handleFilter(perPage,'first_name')}>First Name</TableColumnHead> </TableHead>
                                        <TableHead> <TableColumnHead onClick={()=>handleFilter(perPage,'last_name')}>Last Name</TableColumnHead> </TableHead>
                                        <TableHead> <TableColumnHead onClick={()=>handleFilter(perPage,'level')}>Role</TableColumnHead> </TableHead>
                                        <TableHead> <TableColumnHead onClick={()=>handleFilter(perPage,'position')}>Position</TableColumnHead> </TableHead>
                                        <TableHead> <TableColumnHead onClick={()=>handleFilter(perPage,'department')}>Department</TableColumnHead> </TableHead>
                                        <TableHead> Actions </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody className='z-40'>
                                    {
                                        users.data.map((u)=><UserItem key={u.id} user={u} />)
                                    }
                                </TableBody>
                            </Table>
                        </div>
                        <div className='h-auto'>
                            <div className="flex flex-col space-y-1 md:space-y-0 md:flex-row items-center md:justify-between p-2">
                                <form className='flex flex-col space-y-1 md:flex-row md:space-y-0 md:space-x-1.5 w-full md:w-auto' onSubmit={onSubmit}>
                                    <Input className='w-full md:w-auto' value={val} onChange={({target})=>setVal(target.value)} ref={input} placeholder='Search Users(name/ID#)....' />
                                    <Select  value={currentRole} onValueChange={(val:typeof role)=>{onRoleChange(val)}} >
                                        <SelectTrigger >
                                            <SelectValue placeholder='Filter Role...' />
                                        </SelectTrigger>
                                        <SelectContent side="top">
                                            <SelectItem  value="3">Student</SelectItem>
                                            <SelectItem  value="2">Instructor</SelectItem>
                                            <SelectItem  value="0">No Filter</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </form>
                                <div className="flex items-center space-x-6 lg:space-x-8">
                                    <div className="flex items-center space-x-2">
                                        <p className="text-sm font-medium">Rows per page</p>
                                        <Select value={perPage.toString()} onValueChange={(val)=>{handleFilter(val)}} >
                                            <SelectTrigger className="h-8 w-[4.375rem]">
                                                <SelectValue placeholder='Select...' />
                                            </SelectTrigger>
                                            <SelectContent side="top">
                                                {[5,10, 20, 30, 40, 50, 100].map((pageSize) => (
                                                    <SelectItem key={pageSize} value={`${pageSize}`}>
                                                    {pageSize}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                                        Page&nbsp;{users.current_page.toString()}&nbsp;of&nbsp;{users.last_page}
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Button variant="outline" className="hidden h-8 w-8 p-0 lg:flex" onClick={() => Inertia.get(users.first_page_url)} disabled={users.current_page===1} >
                                            <span className="sr-only">Go to first page</span>
                                            <ChevronsLeft className="h-4 w-4" />
                                        </Button>
                                        <Button variant="outline" className="h-8 w-8 p-0" onClick={()=>users.prev_page_url&&Inertia.get(users.prev_page_url)} disabled={!users?.prev_page_url}>
                                            <span className="sr-only">Go to previous page</span>
                                            <ChevronLeftIcon className="h-4 w-4" />
                                        </Button>
                                        <Button variant="outline" className="h-8 w-8 p-0" onClick={()=>users.next_page_url&&Inertia.get(users.next_page_url)} disabled={!users?.next_page_url}>
                                            <span className="sr-only">Go to next page</span>
                                            <ChevronRightIcon className="h-4 w-4" />
                                        </Button>
                                        <Button variant="outline" className="hidden h-8 w-8 p-0 lg:flex" onClick={() => Inertia.get(users.last_page_url)} disabled={users.current_page===users.last_page} >
                                            <span className="sr-only">Go to last page</span>
                                            <ChevronsRight className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            </DashboardLayout>
        </>
    )
}

export default AdminAllUsers