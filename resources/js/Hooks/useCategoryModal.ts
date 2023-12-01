import { Category } from '@/types';
import {create} from 'zustand';

type CategoryModalStore = {
    data?:Category;
    isOpen?:boolean;
    onOpen:(data?:Category)=>void;
    onClose:()=>void;
}

export const useCategoryModal =create<CategoryModalStore>(set=>({
    data:undefined,
    isOpen:false,
    onOpen:(data)=>set({isOpen:true,data}),
    onClose:()=>set({isOpen:false})
}));

