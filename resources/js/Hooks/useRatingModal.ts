import { Course } from '@/types';
import {create} from 'zustand';

type RatingModalStore = {
    course?:Course;
    isOpen?:boolean;
    onOpen:(course:Course)=>void;
    onClose:()=>void;
}

export const useRatingModal = create<RatingModalStore>(set=>({
    onOpen:(course)=>set({isOpen:true,course}),
    onClose:()=>set({isOpen:false,course:undefined})
}));