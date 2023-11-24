import { Category } from '@/types'
import React, { FC } from 'react'
import { IconMap } from './Categories';
import { cn } from '@/lib/utils';
import { Inertia } from '@inertiajs/inertia';

interface Props{
    category:Category;
    isSelected?:boolean;
    onClick:(id:number)=>void;
}

const CategoryItem:FC<Props> = ({category,isSelected,onClick}) => {
    const {icon_map_number,id,category:label}=category;
    const Icon = icon_map_number!==0&&IconMap[category.icon_map_number];

    

    return (
        <button onClick={()=>onClick(id)} type='button' className={cn('py-2 px-3 text-sm border border-muted-foreground rounded-full flex items-center gap-x-1 hover:border-idcsi hover:opacity-75 transition duration-300',
                isSelected&&'border-idcsi ring-2 ring-idcsi'
            )}>
            {
                Icon && <Icon size={20} />
            }
            <div className='truncate'>
                {label}
            </div>
        </button>
    )
}

export default CategoryItem