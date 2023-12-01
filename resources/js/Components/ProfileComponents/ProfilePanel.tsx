import React, { ChangeEventHandler, FormEventHandler, useEffect } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { useForm, usePage } from '@inertiajs/inertia-react';
import { Page } from '@inertiajs/inertia';
import { PageProps } from '@/types';
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const ProfilePanel = () => {
    const {user} = usePage<Page<PageProps>>().props.auth;
    const {data,setData,processing,post,reset,errors} = useForm({
        first_name:user.first_name,
        last_name:user.last_name,
        email:user?.email||"",
    });

    const onChange:ChangeEventHandler<HTMLInputElement> = ({target}) =>setData(target.id as keyof typeof data,target.value);

    const onSubmit:FormEventHandler<HTMLFormElement> = (e) =>{
        e.preventDefault();
        post(route('profile.update'),{
            onSuccess:()=>toast.success('Profile Updated'),
            onError:()=>toast.error('Something Went Wrong. Please Try Again')
        })
    }

    useEffect(reset,[]);

    return (
        <form onSubmit={onSubmit} className='flex flex-col space-y-3.5 max-w-md'>
            <div className='flex flex-col space-y-1.5'>
                <Label>Company ID</Label>
                <Input value={user.company_id} disabled className='disabled:opacity-75' />
            </div>
            <div className='flex flex-col space-y-1.5'>
                <Label>Email</Label>
                <Input type='email' id='email' value={data.email} onChange={onChange} disabled={processing} placeholder='Email (optional)' />
                {errors.email && <p className='text-destructive text-xs'>{errors.email}</p>}
            </div>
            <div className='flex flex-col space-y-1.5'>
                <Label>First Name</Label>
                <Input required id='first_name' value={data.first_name} onChange={onChange} disabled={processing} />
                {errors.first_name && <p className='text-destructive text-xs'>{errors.first_name}</p>}
            </div>
            <div className='flex flex-col space-y-1.5'>
                <Label>Last Name</Label>
                <Input required id='last_name' value={data.last_name} onChange={onChange} disabled={processing} />
                {errors.last_name && <p className='text-destructive text-xs'>{errors.last_name}</p>}
            </div>
            <div className='flex flex-col space-y-1.5'>
                <Label>Department</Label>
                <Input value={user.department} disabled className='disabled:opacity-75' />
            </div>
            <div className='flex flex-col space-y-1.5'>
                <Label>Position</Label>
                <Input value={user.position} disabled className='disabled:opacity-75' />
            </div>
            <Button type='submit' variant='ddc' disabled={processing}>
                {processing&&<Loader2 className='w-4 h-4 mr-2 animate-spin' />}
                Save Changes
            </Button>
        </form>
    )
}

export default ProfilePanel