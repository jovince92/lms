import { ModeToggle } from '@/Components/ModeToggle'
import { Button } from '@/Components/ui/button'
import { Input } from '@/Components/ui/input'
import { Label } from '@/Components/ui/label'
import { Separator } from '@/Components/ui/separator'
import { HrmsResponse } from '@/types'
import { useForm } from '@inertiajs/inertia-react'
import { Loader2 } from 'lucide-react'
import React, { FC, FormEventHandler } from 'react'

interface Props{
    hrms_response?:HrmsResponse
}

const SignUpPage:FC<Props> = ({hrms_response}) => {
    const {first_name="",last_name="",department=""} = hrms_response||{};
    const {data,setData,processing,reset,post,errors} = useForm({
        company_id:hrms_response?.idno||"",
        password:"",
        password_confirmation:"",
        first_name,
        last_name,
        position:hrms_response?.job_job_title||"",
        department
    });

    const onSubmit:FormEventHandler<HTMLFormElement> = (e) =>{
        e.preventDefault();
        post(route('hrms.store'));
    }

    return (
        <div className='h-full w-full flex flex-col items-center justify-center px-3 py-3.5 overflow-y-hidden relative'>
            <div className='h-full mx-auto max-w-2xl flex flex-col space-y-3.5 p-3.5 border rounded-lg'>
                <div className='h-auto '>
                    <h3 className='text-lg font-medium'>LMS Sign Up</h3>
                    <p className="text-sm text-muted-foreground">Enter your password to Finish Signing Up...</p>
                </div>
                <div className='border-b border-border h-[1px]' />
                <form id='hrms' onSubmit={onSubmit} className='flex flex-col space-y-3.5 flex-1 overflow-y-auto px-3.5'>
                    <div className='space-y-1'>
                        <Label htmlFor='id'>Company ID</Label>
                        <Input required disabled value={data.company_id} onChange={({target})=>setData('company_id',target.value)} id="id" placeholder="Your Company ID" />
                        {errors.company_id && <p className='text-destructive text-xs w-full text-right'>{removeHTMLTags(errors.company_id)}</p> }
                        <p className="text-[0.8rem] text-muted-foreground">This is your DDC Company ID. It will be your Login ID to LMS</p>
                    </div>
                    <div className='space-y-1'>
                        <Label htmlFor='first_name'>First Name</Label>
                        <Input id='first_name' required disabled={processing} value={data.first_name} onChange={({target})=>setData('first_name',target.value)}  />
                        {errors.first_name && <p className='text-destructive text-xs w-full text-right'>{errors.first_name}</p> }
                    </div>
                    <div className='space-y-1'>
                        <Label htmlFor='last_name'>Last Name</Label>
                        <Input id='last_name' required disabled={processing} value={data.last_name} onChange={({target})=>setData('last_name',target.value)}  />
                        {errors.last_name && <p className='text-destructive text-xs w-full text-right'>{errors.last_name}</p> }
                    </div>
                    <div className='space-y-1'>
                        <Label htmlFor='position'>Position</Label>
                        <Input id='position'  disabled required value={data.position} onChange={({target})=>setData('position',target.value)}  />
                    </div>
                    <div className='space-y-1'>
                        <Label htmlFor='department'>Department</Label>
                        <Input id='department'  disabled required value={data.department} onChange={({target})=>setData('department',target.value)}  />
                    </div>
                    <div className='space-y-1'>
                        <Label htmlFor='password'>Password</Label>
                        <Input type='password' id='password'  disabled={processing} required value={data.password} onChange={({target})=>setData('password',target.value)}  />
                        {errors.password && <p className='text-destructive text-xs w-full text-right'>{errors.password}</p> }
                    </div>
                    <div className='space-y-1'>
                        <Label htmlFor='password_confirmation'>Confirm Password</Label>
                        <Input type='password' id='password'  disabled={processing} required value={data.password_confirmation} onChange={({target})=>setData('password_confirmation',target.value)}  />
                    </div>
                </form>
                <div className='h-auto'>
                    
                    <Button form='hrms' variant='ddc' type='submit' disabled={processing}>
                        {
                            processing && <Loader2 className='h-4 w-4 mr-2 animate-spin' />
                        }
                        Sign Up
                    </Button>
                </div>
            </div>
            <div className='absolute top-3 right-3'><ModeToggle /></div>
            
        </div>
    )
}

export default SignUpPage;


const removeHTMLTags = (str:string):string =>{
    if(str==="") return str;
    const parser = new DOMParser();
    const doc = parser.parseFromString(str, "text/html");
    const strippedString = doc.body.textContent || "";
    return strippedString;
}