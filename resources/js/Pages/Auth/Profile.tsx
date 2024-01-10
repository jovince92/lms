import PasswordPanel from '@/Components/ProfileComponents/PasswordPanel'
import PhotoPanel from '@/Components/ProfileComponents/PhotoPanel'
import ProfilePanel from '@/Components/ProfileComponents/ProfilePanel'
import { Badge } from '@/Components/ui/badge'
import { Button } from '@/Components/ui/button'
import { Input } from '@/Components/ui/input'
import { Label } from '@/Components/ui/label'
import { Separator } from '@/Components/ui/separator'
import DashboardLayout from '@/Layouts/DashboardLayout'
import { PageProps } from '@/types'
import { Page } from '@inertiajs/inertia'
import { Head, usePage } from '@inertiajs/inertia-react'
import React, { FC, useState } from 'react'

const Profile:FC = () => {
    
    const [activePanel,setActivePanel] = useState<'profile'|'password'|'photo'>('profile')

    
    const description=activePanel==='profile'?'This is your information based on HRMS.':activePanel==='password'?'Change your password here.':'Change your profile photo.'

    return (
        <>
            <Head title='Profile' />
            <DashboardLayout className='overflow-y-hidden'>
                <div className='p-6 flex flex-col h-full overflow-y-hidden'>
                    <div className='flex flex-col space-y-0.5 h-auto'>
                        <h2 className='text-2xl font-bold tracking-tight'>Profile</h2>
                        <p className="text-muted-foreground">Manage your account settings.</p>
                    </div>
                    <Separator className='my-6' />
                    <div className='flex-1 w-full relative pl-40 overflow-y-hidden'>
                        <div className='h-full w-40 absolute left-0  z-50 flex flex-col space-y-2'>
                            <Button onClick={()=>setActivePanel('profile')} className='justify-start' variant={activePanel==='profile'?'secondary':'ghost'}>Profile</Button>
                            {/* <Button onClick={()=>setActivePanel('password')} className='justify-start' variant={activePanel==='password'?'secondary':'ghost'}>Password</Button> */}
                            <Button onClick={()=>setActivePanel('photo')} className='justify-start' variant={activePanel==='photo'?'secondary':'ghost'}>Photo</Button>
                        </div>
                        <div className=' h-full px-3.5 flex flex-col space-y-2 overflow-y-hidden'>
                            <div className='flex flex-col space-y-0.5 h-auto'>
                                <h2 className='text-lg font-bold tracking-tight capitalize'>{activePanel}</h2>
                                <p className="text-muted-foreground text-sm">{description}</p>
                            </div>
                            <Separator />
                            <div className='flex-1 overflow-y-auto px-3.5'>
                                {activePanel==='profile'?<ProfilePanel />:activePanel==='password'?<PasswordPanel />: <PhotoPanel />}
                            </div>
                        </div>
                    </div>
                </div>
            </DashboardLayout>
        </>
    )
}

export default Profile