import { Search } from 'lucide-react'
import React, { FC, FormEventHandler, useEffect, useState } from 'react'
import { Input } from './ui/input'
import { useDebounce } from '@/Hooks/useDebounce';
import { Inertia } from '@inertiajs/inertia';

const SearchInput:FC = () => {
    //@ts-ignore
    const {catIds,title}= route().params;
    const [val,setVal] =useState(title||"");
    const debouncedVal = useDebounce(val);
    
    

    const onSubmit:FormEventHandler<HTMLFormElement> =  (e) =>{
        e.preventDefault();
        
        Inertia.get(route('search.index',{
                catIds,
                title:val
            }),{},{
            preserveScroll:true
        });
    }
    


    return (
        <div className='relative'>
            <Search className='h-4 w-4 absolute top-3 left-3 text-muted-foreground' />
            <form onSubmit={onSubmit}>
                <Input value={val} onChange={({target})=>setVal(target.value)} className='w-full md:w-[18.75rem] pl-9 rounded-full' placeholder='Seach for a course...' />
            </form>
        </div>
    )
}

export default SearchInput