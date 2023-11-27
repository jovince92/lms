import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Button } from './ui/button'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { PageProps } from '@/types'
import { Inertia, Page } from '@inertiajs/inertia'
import { usePage } from '@inertiajs/inertia-react'

const UserButton = () => {
    
    const {user} = usePage<Page<PageProps>>().props.auth;
    return (
        <DropdownMenu >
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8 border border-idcsi">
                    <AvatarImage src={user.photo} alt="Photo" />
                    <AvatarFallback>{`${user.first_name.charAt(0)+user.last_name.charAt(0)}`}</AvatarFallback>
                </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none capitalize">{`${user.first_name} ${user.last_name}`}</p>
                        <p className="text-xs leading-none text-muted-foreground uppercase">
                            {user.company_id}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={()=>Inertia.post(route('logout'))}>
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UserButton