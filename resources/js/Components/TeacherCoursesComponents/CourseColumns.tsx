

import { Course } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronsLeftRight, MoreHorizontal } from "lucide-react";
import { Button } from "../ui/button";
import { format } from "date-fns";


export const CourseColumns: ColumnDef<Course>[] = [
    {
        accessorKey: "title",
        header: ({column})=><Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>Title<ChevronsLeftRight className="ml-2 h-4 w-4 rotate-90" /></Button>,
    },
    
    {
        accessorKey: "user_id",
        header: ({column})=><Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>Creator<ChevronsLeftRight className="ml-2 h-4 w-4 rotate-90" /></Button>,
        cell: ({row})=><span className="capitalize">{`${row.original.user.first_name} ${row.original.user.last_name}`}</span>
    },
    {
        accessorKey: "category_id",
        header: ({column})=><Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>Category<ChevronsLeftRight className="ml-2 h-4 w-4 rotate-90" /></Button>,
        cell: ({row})=><span>{row.original.category?.category||""}</span>
    },
    {
        accessorKey: "is_published",
        header: ({column})=><Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>Published?<ChevronsLeftRight className="ml-2 h-4 w-4 rotate-90" /></Button>,
        cell:({row})=><span>{row.original.is_published===1?'Yes':'No'}</span>
    },
    {
        accessorKey: "created_at",
        header: ({column})=><Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>Create Date<ChevronsLeftRight className="ml-2 h-4 w-4 rotate-90" /></Button>,
        cell:({row})=><span>{format(new Date(row.original.created_at),'PPp')}</span>
    },
]
