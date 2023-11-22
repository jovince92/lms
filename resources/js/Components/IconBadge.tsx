import { cn } from '@/lib/utils';
import { VariantProps, cva } from 'class-variance-authority'
import { LucideIcon } from 'lucide-react';
import React, { FC } from 'react'

const backgroundVariants = cva('border rounded-full flex items-center justify-center',{
    variants:{
        variant:{
            default:"border-border",
            success:"border-emerald-100 dark:border-emerald-900"
        },
        size:{
            default: "p-2",
            sm:"p-1"
        }
    },
    defaultVariants:{
        variant:'default',
        size:'default'
    }
});

const iconVariants = cva('',{
    variants:{
        variant:{
            default:"text-primary",
            success:"text-emerald-700 dark:text-emerald-300"
        },
        size:{
            default: "h-8  w-8",
            sm:"h-4  w-4"
        }
    },
    defaultVariants:{
        variant:'default',
        size:'default'
    }
});

type BackgoundVariantProps  = VariantProps<typeof backgroundVariants>;
type IconVariantProps  = VariantProps<typeof iconVariants>;

interface Props extends BackgoundVariantProps,IconVariantProps{
    Icon:LucideIcon;
}

const IconBadge:FC<Props> = ({Icon,size,variant}) => {
    return (
        <div className={cn(backgroundVariants({variant,size}))}>
            <Icon className={cn(iconVariants({variant,size}))} />
        </div>
    )
}

export default IconBadge