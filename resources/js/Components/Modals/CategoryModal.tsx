import React, { FC, useEffect, useMemo } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { useCategoryModal } from '@/Hooks/useCategoryModal';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Check, ChevronsUpDown, Command, Loader2, } from 'lucide-react';
import { IconMap } from '../SearchPageComponents/Categories';
import { useForm } from '@inertiajs/inertia-react';
import { CommandEmpty, CommandGroup, CommandInput, CommandItem } from '../ui/command';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { IconType } from 'react-icons';
import { FcSearch } from 'react-icons/fc';
import { PopoverClose } from '@radix-ui/react-popover';
import { toast } from 'sonner';

const CategoryModal = () => {
    const {data,setData,processing,errors,reset,post} = useForm({
        category:"",
        icon_map_number:0,
        id:0,
    })
    const {isOpen,data:categoryModalData,onClose} =useCategoryModal();
    const hasData = !!data.id || data.id!==0;

    const icons:{iconNo:number;icon:IconType}[] = useMemo(()=>{
        let icons:{iconNo:number;icon:IconType}[]=[];
        for(let i=1;i<=12;i++){
            icons.push({
                iconNo:i,
                icon:IconMap[i]
            });
        }
        return icons;
    },[IconMap]);

    const Icon = data.icon_map_number===0? FcSearch:  IconMap[data.icon_map_number];

    useEffect(()=>{
        reset();
        if(!categoryModalData) return;
        setData(val=>({...val,id:categoryModalData.id,category:categoryModalData.category,icon_map_number:categoryModalData.icon_map_number}));
    },[categoryModalData,isOpen]);

    const onSubmit = () =>{
        const href= !hasData?route('categories.store'):route('categories.update');

        if(data.category==="" || data.category.length<3) return toast.error('Category Name is Too Short');
        if(data.icon_map_number===0|| !data.icon_map_number) return toast.error('Please select an Icon');
        post(href,{
            onSuccess:()=>toast.success('Success'),
            onError:()=>toast.error('Something Went Wrong. Please Try Again')
        });
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>{hasData?'Edit Category':'Add Category'}</DialogTitle>
                    <DialogDescription>
                        Modify Existing Category or Add a New One
                    </DialogDescription>
                </DialogHeader>
                <div className='flex items-center space-x-1'>
                    <div className='flex flex-col space-y-1 flex-1'>
                        <Label>Category Name:</Label>
                        <Input value={data.category||""} onChange={({target})=>setData('category',target.value)} disabled={processing} />
                    </div>
                    <div className='flex flex-col space-y-1 w-32'>
                        <Label>Category Icon:</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button disabled={processing} variant="outline"  role="combobox" className="w-32 justify-between">
                                    {data.icon_map_number!==0
                                        ? <Icon size={20} />
                                        : <span>Select Icon...</span>
                                    }
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-52 p-0 grid grid-cols-3" side='bottom'>
                                
                                    
                                {icons.map(icon => (
                                    <PopoverClose asChild>
                                        <Button variant='ghost' className='rounded-full' key={icon.iconNo} onClick={() => setData('icon_map_number',icon.iconNo)} >
                                            {/* <Check className={cn("mr-2 h-4 w-4",
                                                data.icon_map_number === icon.iconNo ? "opacity-100" : "opacity-0"
                                                )}
                                            /> */}
                                            <Item I={IconMap[icon.iconNo]} />
                                        </Button>
                                    </PopoverClose>
                                ))}
                                    
                                
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={onSubmit} disabled={processing}>
                        {processing&& <Loader2 className='h-5 w-5 mr-2 animate-spin' />}
                        Save changes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default CategoryModal;

const Item:FC<{I:IconType}> = ({I}) => <I size={20} />