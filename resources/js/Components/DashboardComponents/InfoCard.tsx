import { LucideIcon } from 'lucide-react'
import React, { FC } from 'react'
import IconBadge from '../IconBadge';

interface Props{
    Icon:LucideIcon;
    label:string;
    lenght:number;
}

const InfoCard:FC<Props> = ({Icon,label,lenght}) => {
    return (
        <div className='border rounded-md flex items-center gap-x-2 p-3'>
            <IconBadge Icon={Icon} />
            <div>
                <p className='font-medium'>{label}</p>
                <p className='text-muted-foreground text-sm'>
                    {lenght} {`Course${lenght===1?'':'s'}`}
                </p>
            </div>
        </div>
    )
}

export default InfoCard