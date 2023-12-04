import {  QuizQuestion } from '@/types';
import {create} from 'zustand';

type QuestionFormSheet = {
    data?:QuizQuestion;
    isOpen?:boolean;
    onOpen:( quiz_id:number, data?:QuizQuestion)=>void;
    onClose:()=>void;
    quiz_id:number;
}

export const useQuestionFormSheet =create<QuestionFormSheet>(set=>({
    data:undefined,
    isOpen:false,
    quiz_id:0,
    onOpen:(quiz_id,data)=>set({isOpen:true,quiz_id,data}),
    onClose:()=>set({isOpen:false})
}));

