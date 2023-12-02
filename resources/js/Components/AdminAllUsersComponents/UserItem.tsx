import { User } from '@/types'
import React, { FC } from 'react'
import { TableCell, TableRow } from '../ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import UserActions from './UserActions';

interface Props{
    user:User;
}

const UserItem:FC<Props> = ({user}) => {
    const {first_name,last_name,company_id,photo,department,role,position} = user
    return (
        <TableRow>
            <TableCell>
                <div className='flex items-center justify-center'>
                    <Avatar className="h-8 w-8 border border-idcsi">
                        <AvatarImage src={user.photo} alt="Photo" />
                        <AvatarFallback>{`${user.first_name.charAt(0)+user.last_name.charAt(0)}`}</AvatarFallback>
                    </Avatar>
                </div>
            </TableCell>
            <TableCell><span className='px-4 line-clamp-1'>{company_id}</span></TableCell>
            <TableCell><span className='px-4 line-clamp-1'>{first_name}</span></TableCell>
            <TableCell><span className='px-4 line-clamp-1'>{last_name}</span></TableCell>
            <TableCell><span className='px-4 line-clamp-1'>{role}</span></TableCell>
            
            <TableCell><span className='px-4 line-clamp-1'>{position}</span></TableCell>
            
            <TableCell><span className='px-4 line-clamp-1'>{department}</span></TableCell>
            <TableCell className="text-right">
                <UserActions user={user}/>
                
            </TableCell>
        </TableRow>
    )
}

export default UserItem