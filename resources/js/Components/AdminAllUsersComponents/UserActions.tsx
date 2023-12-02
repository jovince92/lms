import React, { FC } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Button } from '../ui/button'
import { MoreHorizontal } from 'lucide-react'
import { User } from '@/types'
import { Inertia } from '@inertiajs/inertia'
import { toast } from 'sonner'

const UserActions:FC<{user:User}> = ({user}) => {

    const setRole = () =>{
        const {id}=user;
        Inertia.post(route('users.set_role'),{
            id,
            level: user.level===3?2:2
        },{
            onSuccess:()=>toast.success('Role changed'),
            onError:()=>toast.error('Something went wrong. Please try again')
        })
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant='ghost' className="h-4 w-8 p-0">
                    <span className="sr-only">Open Menu</span>
                    <MoreHorizontal />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                
                <DropdownMenuItem onClick={setRole}>
                    Changer Role To {user.level===3?'Instructor':'Student'}
                </DropdownMenuItem>
                
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UserActions