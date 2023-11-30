import { Category, PageProps } from '@/types';
import { Inertia, Page } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/inertia-react';
import React, { FC, useMemo } from 'react'

import { IconType } from "react-icons";
import { FcAssistant, FcBullish, FcCloseUpMode, FcCommandLine, FcEngineering, FcFilmReel, FcFlowChart, FcGenealogy, FcMultipleDevices, FcMusic, FcOldTimeCamera, FcSafe, FcSalesPerformance, FcSportsMode } from "react-icons/fc";
import CategoryItem from './CategoryItem';

export const IconMap:Record<number,IconType> = {
    1: FcMusic,
    2: FcOldTimeCamera,
    3: FcSportsMode,
    4: FcSalesPerformance,
    5: FcMultipleDevices,
    6: FcFilmReel,
    7: FcEngineering,
    8: FcSafe,
    9: FcFlowChart,
    10: FcCommandLine,
    11: FcAssistant ,
    12: FcBullish,
}

interface Props{
    selected_categories:Category[];
}

const Categories:FC<Props> = ({selected_categories}) => {
    //@ts-ignore
    const {title}= route().params;
    const {categories} = usePage<Page<PageProps>>().props;
    
    const onClick = (id:number) =>{
        const isSelected = selected_categories.findIndex(selectedCat=>selectedCat.id===id)>-1;
        const ids = (selected_categories||[]).map(cat=>(cat.id.toString()));
        const catIds= !isSelected?[...ids,id] :ids.filter(i=>i!==id.toString()) ;        
        
        Inertia.get(route('search.index',{
            catIds:catIds.join(','),
            title
        }),{},{
            preserveScroll:true,
            preserveState:true
        });
        
    }

    return (
        <div className='flex items-center px-3.5 space-x-2 overflow-x-auto pt-0.5 pb-3.5'>
            {
                categories.map(cat=><CategoryItem onClick={onClick} isSelected={selected_categories.findIndex(selectedCat=>selectedCat.id===cat.id)>-1} key={cat.id} category={cat} />)
            }
        </div>
    )
}

export default Categories