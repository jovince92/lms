import React, { FC } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Button } from './ui/button'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { PageProps } from '@/types'
import { Inertia, Page } from '@inertiajs/inertia'
import { usePage } from '@inertiajs/inertia-react'
import { LogOutIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

const UserButton:FC<{className?:string;}> = ({className}) => {
    
    const {user} = usePage<Page<PageProps>>().props.auth;
    return (
        <DropdownMenu >
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className={cn("h-8 w-8 border border-idcsi",className)}>
                    <AvatarImage src={user.photo} alt="Photo" />
                    <AvatarFallback>{`${user.first_name.charAt(0)+user.last_name.charAt(0)}`}</AvatarFallback>
                </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-medium leading-none capitalize">Role:</p>
                            <p className="text-xs leading-none text-muted-foreground uppercase">
                                {user.role}
                            </p>
                        </div>
                    </DropdownMenuLabel>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none capitalize">{`${user.first_name} ${user.last_name}`}</p>
                        <p className="text-xs leading-none text-muted-foreground uppercase">
                            {user.company_id}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className='cursor-pointer' onClick={()=>Inertia.post(route('logout'))}>
                    <LogOutIcon className='h-5 w-5 mr-2' /> Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UserButton