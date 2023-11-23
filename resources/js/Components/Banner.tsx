import React, { FC } from 'react'

import {cva,VariantProps} from 'class-variance-authority'
import { AlertTriangle, CheckCircle2Icon } from 'lucide-react';
import { cn } from '@/lib/utils';


const bannerVariants = cva(
    'border text-center p-4 text-sm flex items-center w-full',{
        variants:{
            variant:{
                warning:'bg-yellow-200/80 dark:bg-yellow-900/80 border-yellow-300 dark:border-yellow-800 text-primary',
                success:'bg-emerald-700 dark:bg-emerald-900 border-emerald-800 dark:border-emerald-700 text-white'
            }
        },
        defaultVariants:{
            variant:'warning'
        }
    }
);

const ICONMAP = {
    warning:AlertTriangle,
    success:CheckCircle2Icon
}

interface Props extends VariantProps<typeof bannerVariants>{
    label:string;
}

const Banner:FC<Props> = ({label,variant}) => {
    const Icon = ICONMAP[variant||'warning'];
    return (
        <div className={cn(bannerVariants({variant}))}>
            <Icon className='h-4 w-4 mr-2' />{label}
        </div>
    )
}

export default Banner