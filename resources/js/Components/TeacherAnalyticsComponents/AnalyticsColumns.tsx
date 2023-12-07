

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
        cell: ({row})=><p className="capitalize">{`${row.original.user.first_name} ${row.original.user.last_name}`}</p>
    },
    {
        accessorFn:row=>row.course.title,
        id:'title',
        header: ({column})=><Button  className='text-primary px-0'  variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>Course Title<ChevronsLeftRight className="ml-2 h-4 w-4 rotate-90" /></Button>,
        cell: ({row})=><p className="capitalize">{`${row.original.course.title}`}</p>
    },
    
    {
        accessorKey: "chapter_count",
        header: ({column})=><Button  className='text-primary px-0'  variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>Course Lenght<ChevronsLeftRight className="ml-2 h-4 w-4 rotate-90" /></Button>,
        cell: ({row})=><p className="capitalize">{row.original.chapter_count}</p>
    },
    {
        accessorKey: "completed_chapters",
        header: ({column})=><Button  className='text-primary px-0'  variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>Completed Chapters<ChevronsLeftRight className="ml-2 h-4 w-4 rotate-90" /></Button>,
        cell: ({row})=><span>{row.original.completed_chapters}</span>
    },
    {
        header:({column})=><span className="text-primary">Quiz Score</span>,
        id:'Actions',
        cell:({row})=> <p>No Result</p>
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
