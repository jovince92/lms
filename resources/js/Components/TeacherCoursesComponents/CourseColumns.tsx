

import { Course } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import {  ChevronsLeftRight, MoreHorizontal, Pencil } from "lucide-react";
import { Button } from "../ui/button";
import { format } from "date-fns";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Link } from "@inertiajs/inertia-react";
import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";


export const CourseColumns: ColumnDef<Course>[] = [
    {
        accessorKey: "title",
        header: ({column})=><Button  className='text-primary'  variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>Title<ChevronsLeftRight className="ml-2 h-4 w-4 rotate-90" /></Button>,
    },
    
    {
        accessorKey: "user_id",
        id:'user',
        header: ({column})=><Button  className='text-primary'  variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>Creator<ChevronsLeftRight className="ml-2 h-4 w-4 rotate-90" /></Button>,
        cell: ({row})=><span className="capitalize">{`${row.original.user.first_name} ${row.original.user.last_name}`}</span>
    },
    {
        accessorKey: "category_id",
        id:'Category',
        header: ({column})=><Button  className='text-primary'  variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>Category<ChevronsLeftRight className="ml-2 h-4 w-4 rotate-90" /></Button>,
        cell: ({row})=><span>{row.original.category?.category||""}</span>
    },
    {
        accessorKey: "is_published",
        header: ({column})=><Button  className='text-primary'  variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>Published?<ChevronsLeftRight className="ml-2 h-4 w-4 rotate-90" /></Button>,
        cell:({row})=>(
            <Badge className={cn('bg-secondary text-primary pointer-events-none',
                    row.original.is_published===1 && 'bg-sky-700 text-white'
                )}>
                {row.original.is_published===1?'Published':'Draft'}
            </Badge>
        )
    },
    {
        accessorKey: "created_at",
        id:'Create Date',
        header: ({column})=><Button className='text-primary'   variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>Create Date<ChevronsLeftRight className="ml-2 h-4 w-4 rotate-90" /></Button>,
        cell:({row})=><span>{format(new Date(row.original.created_at),'PPp')}</span>
    },
    {
        header:({column})=><span className="text-primary">Actions</span>,
        id:'Actions',
        cell:({row})=> {
            const {id} = row.original;
            return(
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant='ghost' className="h-4 w-8 p-0">
                            <span className="sr-only">Open Menu</span>
                            <MoreHorizontal />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <Link href={route('teacher.courses.show',{id})}>
                            <DropdownMenuItem>
                                <Pencil className="h-4 w-4 mr-2" />Edit
                            </DropdownMenuItem>
                        </Link>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        }
    }
]
