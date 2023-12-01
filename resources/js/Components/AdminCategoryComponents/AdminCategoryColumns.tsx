


import { ColumnDef } from "@tanstack/react-table";
import {  ChevronsLeftRight, MoreHorizontal, Pencil } from "lucide-react";
import { Button } from "../ui/button";
import { format } from "date-fns";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Link } from "@inertiajs/inertia-react";
import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";
import { IconMap } from "../SearchPageComponents/Categories";
import { Category } from "@/types";
import { useCategoryModal } from "@/Hooks/useCategoryModal";

import React from 'react'


export const AdminCategoryColumns: ColumnDef<Category>[] = [
    
    {
        accessorKey: "id",
        header: ({column})=><Button  className='text-primary px-0'  variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>ID<ChevronsLeftRight className="ml-2 h-4 w-4 rotate-90" /></Button>,
    },
    {
        accessorKey: "icon_map_number",
        id: "icon",
        header: ({column})=><Button  className='text-primary px-0'  variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>Icon<ChevronsLeftRight className="ml-2 h-4 w-4 rotate-90" /></Button>,
        cell: ({row})=>{
            const Icon = IconMap[row.original.icon_map_number];
            return <Icon size={20} />
        }
    },
    
    {
        accessorKey: "category",
        id:'title',
        header: ({column})=><Button  className='text-primary px-0'  variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>Title<ChevronsLeftRight className="ml-2 h-4 w-4 rotate-90" /></Button>,
        cell: ({row})=><p className="capitalize">{`${row.original.category}`}</p>
    },   
    {
        accessorKey: "course_count",
        header: ({column})=><Button  className='text-primary px-0'  variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>No. of Courses<ChevronsLeftRight className="ml-2 h-4 w-4 rotate-90" /></Button>,
        
    },
    {
        header:({column})=><span className="text-primary">Actions</span>,
        id:'Actions',
        cell:({row})=> {
            const {onOpen} = useCategoryModal();
            return(
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant='ghost' className="h-4 w-8 p-0">
                            <span className="sr-only">Open Menu</span>
                            <MoreHorizontal />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        
                        <DropdownMenuItem onClick={()=>onOpen(row.original)}>
                            <Pencil className="h-4 w-4 mr-2" />Edit
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        }
    }
]
