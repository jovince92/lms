import React, { FC, useEffect, useState } from 'react'
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from '../ui/sheet';
import { Quiz } from '@/types';
import { useQuestionFormSheet } from '@/Hooks/useQuestionFormSheet';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import Editor from '@/Pages/Editor';
import { useForm } from '@inertiajs/inertia-react';
import { Separator } from '../ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { CheckCircle, Loader2, Minus, MinusCircle, PlusCircle } from 'lucide-react';
import { Input } from '../ui/input';
import { toast } from 'sonner';


const QuestionFormSheet:FC = () => {
    
    const {isOpen,data:questionData,onClose,quiz_id} = useQuestionFormSheet();
    
    const {data,setData,reset,post,processing} = useForm({
        question:"",
        type:"1",
        choices: ["Choice 1","Choice 2"] ,
        answer:""
    });
    
    const onAdd= () =>setData(val=>({...val,choices:[...val.choices,`Choice ${(val.choices.length+1).toString()}`]}));
    const onRemove= () =>{
        if (data.choices.length<3) return;
        setData(val=>({...val,choices:val.choices.filter((c,i)=>i!==val.choices.length-1)}));
    }
    
    
    useEffect(()=>{
        if(isOpen && !!questionData){
            console.log(questionData.quiz_answer.answer);
            setData(val=>({
                ...val,
                question:questionData.question,
                answer:questionData.quiz_answer.answer,
                type:questionData.type.toString(),
                choices: questionData.quiz_choices.length<2?["Choice 1","Choice 2"] : questionData.quiz_choices.map(q=>(q.choice))  ,
                
            }));
        }else {
            reset();
        }
    },[isOpen]);
    const onChange = (value:string,idx:number) => {
        setData(val=>({
            ...val,
            choices:val.choices.map((c,i)=>i===idx?value:c)
        }));
    }
    if(!quiz_id) return null;

    
    const onSubmit = () =>{
        if(data.type!=='1'&&data.type!=='2') return toast.error('Select a question type');
        if(data.question.length<15) return toast.error('Question is too short');
        if(data.answer===""||!data.answer) return toast.error('Input or Choose an answer');
        const href= !questionData?route('teacher.courses.quiz.question.store',{quiz_id}):route('teacher.courses.quiz.question.update',{quiz_id,id:questionData.id})
        post(href,{
            onSuccess:onClose,
            onError:()=>toast.error('Something Went Wrong. Please try again.')
        });
    }

    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent side='left' className=' sm:min-w-[32rem] md:min-w-[36rem] lg:min-w-[42rem] xl:min-w-[48rem] 2xl:min-w-[56rem] h-full flex flex-col space-y-1 overflow-y-hidden'>
                <SheetHeader className='h-auto'>
                    <SheetTitle>Question Form</SheetTitle>
                    <SheetDescription>
                        Ensure that questions are clear and easily comprehensible.
                    </SheetDescription>
                </SheetHeader>
                <Separator />
                <div className='flex-1 flex flex-col space-y-3.5 overflow-y-auto gap-x-3.5 p-4'>
                    <div className='flex flex-col items-center space-y-1 md:flex-row md:space-y-0 md:justify-between '>
                        <div className='md:mr-auto'>
                            <Label className='whitespace-nowrap'>Question Type:</Label>
                            <Select disabled={processing} value={data.type} onValueChange={e=>setData('type',e)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Quesion Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="1">Multiple Choice</SelectItem>
                                    <SelectItem value="2">Type the Answer</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <Label>
                            Answer: {data.answer.length<1?'No Answer':data.answer}
                        </Label>
                    </div>
                    <div className='flex flex-col space-y-1 pb-24 md:pb-12'>
                        <Label htmlFor='question'>Question:</Label>
                        <Editor readonly={processing} id='question' value={data.question} onChange={val=>setData('question',val)} />
                    </div>
                    {
                        data.type==='1' && (
                            <div className='flex flex-col space-y-1'>
                                <div className='flex items-center justify-between'>
                                    <p className='text-xl font-medium tracking-tight'>Multiple Choice</p>
                                    <div className='flex items-center space-x-1.5'>
                                        <Button disabled={processing} onClick={onRemove} variant='outline' size='icon' className='rounded-full'>
                                            <MinusCircle />
                                        </Button>
                                        <Button disabled={processing} onClick={onAdd} variant='outline' size='icon' className='rounded-full'>
                                            <PlusCircle />
                                        </Button>
                                    </div>
                                </div>
                                <Separator />
                                <div className='grid grid-cols-1 md:grid-cols-2 gap-2.5'>
                                    {
                                        data.choices.map((c,_i)=>(
                                            <div key={c} className='flex items-center space-x-1' >
                                                <Button disabled={processing} onClick={()=>setData('answer',c)} variant={c===data.answer?'ddc':'outline'} >
                                                    <CheckCircle />
                                                </Button>
                                                <Input onFocus={e=>e.target.setSelectionRange(0,e.target.value.length)} disabled={processing} value={data.choices[_i]} onChange={({target})=>onChange(target.value,_i)} />
                                            </div>
                                        ))
                                        
                                    }
                                </div>
                            </div>
                        )
                    }
                    {
                        data.type==='2' && (
                            <div className='flex flex-col space-y-1'>
                                <div className='flex items-center justify-between text-xl font-medium tracking-tight'>
                                    Type The Answer
                                </div>
                                <Separator />
                                <div className='flex flex-col space-y-1'>
                                    <Label htmlFor='answer'>Answer:</Label>
                                    <Input disabled={processing} value={data.answer} onChange={({target})=>setData('answer',target.value)} autoComplete='off' />
                                </div>
                            </div>
                        )
                    }
                </div>
                <SheetFooter className='h-auto'>
                    <Button onClick={onSubmit} disabled={processing} variant='ddc'>
                        {processing&& <Loader2 className='h-5 w-5 mr-2 animate-spin' />}
                        Save
                    </Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}

export default QuestionFormSheet;