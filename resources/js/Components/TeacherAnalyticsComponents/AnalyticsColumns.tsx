

import { Course } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import {  ChevronsLeftRight, MoreHorizontal, Pencil } from "lucide-react";
import { Button } from "../ui/button";
import { format } from "date-fns";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Link } from "@inertiajs/inertia-react";
import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";
import { AnalyticsData } from "@/Pages/TeacherAnalytics";


export const AnalyticsColumns: ColumnDef<AnalyticsData>[] = [
    {
        accessorKey: "user_id",
        id:'user',
        header: ({column})=><Button  className='text-primary px-0'  variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>Student<ChevronsLeftRight className="ml-2 h-4 w-4 rotate-90" /></Button>,
        cell: ({row})=>(
            <div className="flex flex-col space-y-0.5">
                <p className="capitalize whitespace-nowrap">{`${row.original.user.first_name} ${row.original.user.last_name}`}</p>
                <p className="capitalize tracking-tight font-light text-muted-foreground">{row.original.user.company_id}</p>
            </div>
        )
    },
    {
        accessorFn:row=>row.course.title,
        id:'title',
        header: ({column})=><Button  className='text-primary px-0'  variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>Course Title<ChevronsLeftRight className="ml-2 h-4 w-4 rotate-90" /></Button>,
        cell: ({row})=><p className="capitalize">{`${row.original.course.title}`}</p>
    },
    
    {
        accessorKey: "chapter_count",
        header: ({column})=><Button  className='text-primary px-0'  variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>Course Length<ChevronsLeftRight className="ml-2 h-4 w-4 rotate-90" /></Button>,
        cell: ({row})=><p className="capitalize">{row.original.chapter_count} Chapters</p>
    },
    {
        accessorKey: "completed_chapters",
        header: ({column})=><Button  className='text-primary px-0'  variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>Completed Chapters<ChevronsLeftRight className="ml-2 h-4 w-4 rotate-90" /></Button>,
        cell: ({row})=><span>{row.original.completed_chapters}</span>
    },
    {
        accessorKey: "score",
        header: ({column})=><Button  className='text-primary px-0'  variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>Quiz Score<ChevronsLeftRight className="ml-2 h-4 w-4 rotate-90" /></Button>,
        cell:({row})=> <p>{row.original.score || 'No Result'}</p>
    },
    {
        accessorFn:row=>Math.floor((row.completed_chapters/row.chapter_count)*100),
        id: "quiz",
        header: ({column})=><Button  className='text-primary px-0'  variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>Progress<ChevronsLeftRight className="ml-2 h-4 w-4 rotate-90" /></Button>,
        cell:({row})=> <span>{ `${Math.floor((row.original.completed_chapters/row.original.chapter_count)*100)}%` }</span>
    },
    {
        accessorKey: "date_started",
        header: ({column})=><Button className='text-primary px-0'   variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>Date Started<ChevronsLeftRight className="ml-2 h-4 w-4 rotate-90" /></Button>,
        cell:({row})=><span>{format(new Date(row.original.date_started),'PPp')}</span>
    }
]
