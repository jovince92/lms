import { useForm } from '@inertiajs/inertia-react';
import React, { ChangeEventHandler, FormEventHandler, useEffect } from 'react'
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';

const PasswordPanel = () => {

    const {data,setData,processing,post,reset,errors} = useForm({
        current_password:"",
        password:"",
        password_confirmation:""
    });

    const onChange:ChangeEventHandler<HTMLInputElement> = ({target}) =>setData(target.id as keyof typeof data,target.value);

    const onSubmit:FormEventHandler<HTMLFormElement> = (e) =>{
        e.preventDefault();
        post(route('profile.password'),{
            onSuccess:()=>{
                toast.success('Profile Updated');
                reset();
            },
            onError:()=>toast.error('Something Went Wrong. Please Try Again')
        })
    }

    useEffect(reset,[]);

    return (
        <form onSubmit={onSubmit} className='flex flex-col space-y-3.5 max-w-md'>
            <div className='flex flex-col space-y-1.5'>
                <Label>Old Password</Label>
                <Input type='password' id='current_password' required value={data.current_password} onChange={onChange} disabled={processing}/>
                {errors.current_password && <p className='text-destructive text-xs'>{errors.current_password}</p>}
            </div>
            <div className='flex flex-col space-y-1.5'>
                <Label>New Password</Label>
                <Input type='password' id='password' required value={data.password} onChange={onChange} disabled={processing}/>
                {errors.password && <p className='text-destructive text-xs'>{errors.password}</p>}
            </div>
            <div className='flex flex-col space-y-1.5'>
                <Label>Confirm Password</Label>
                <Input type='password' id='password_confirmation' required value={data.password_confirmation} onChange={onChange} disabled={processing}/>
                {errors.password_confirmation && <p className='text-destructive text-xs'>{errors.password_confirmation}</p>}
            </div>
            
            <Button type='submit' variant='ddc' disabled={processing}>
                {processing&&<Loader2 className='w-4 h-4 mr-2 animate-spin' />}
                Change Password
            </Button>
        </form>
    )
}

export default PasswordPanel