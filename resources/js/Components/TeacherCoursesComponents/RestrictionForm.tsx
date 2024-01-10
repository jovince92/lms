import { Course } from '@/types';
import React, { FC, ReactNode, useEffect, useMemo, useRef, useState } from 'react'
import { Button } from '../ui/button';
import { Check, CheckIcon, ChevronsUpDownIcon, Loader, Loader2, PlusCircle, PlusIcon, Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { useDeptsAndPositions } from '@/Hooks/useDeptsAndPositions';
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from '../ui/command';
import { cn } from '@/lib/utils';
import { Inertia } from '@inertiajs/inertia';
import { toast } from 'sonner';

interface Props{
    course: Course;
}

const RestrictionForm:FC<Props> = ({course}) => {
    const {getData,positions,departments} = useDeptsAndPositions();
    const [showDepartmentRestrictionModal,setShowDepartmentRestrictionModal] = useState(false);
    
    const [showPositionRestrictionModal,setShowPositionRestrictionModal] = useState(false);
    useEffect(()=>{
        const fetchData = async () => await getData();
        if(!positions|| !departments) fetchData();
    },[positions,departments,getData]);
    return (
        <>
            <div className='mt-5 border bg-secondary rounded-md p-3.5 flex flex-col space-y-3.5'>
                <div className='flex flex-col space-y-1.5'>
                    <div className='font-medium flex items-center justify-between'>
                        <p>Department Restrictions</p>
                        {
                            !departments? <Loader2 className='w-5 h-5 animate-spin' />:(
                                
                                <Button onClick={()=>setShowDepartmentRestrictionModal(true)} variant='ghost' size='sm'>
                                    <PlusCircle className='w-5 h-5' />
                                </Button>
                            )
                        }
                    </div>
                    {course.department_restrictions.length<1 ? <p className='text-xs'>This Course is Visible To All Departments</p>:<p className='text-xs'>This Course is Visible Only to the Departments Below</p>}  
                    <div className='flex flex-wrap gap-1.5'>
                        {
                            course.department_restrictions.map(dept=> (
                                <div key={dept.id} className='border border-muted-foreground rounded py-1 px-2 flex space-x-2.5 items-center text-sm'>
                                    <p>{dept.department}</p>
                                    <Button variant='ghost' size='sm' onClick={()=>Inertia.post(route('teacher.courses.restrictions.departments.destroy',{
                                        course_id:course.id,
                                        id:dept.id
                                    }))}>
                                        <Trash2 className='w-5 h-5 text-destructive' />
                                    </Button>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className='flex flex-col space-y-1.5'>
                    <div className='font-medium flex items-center justify-between'>
                        <p>Position Restrictions</p>
                        {
                            !positions? <Loader2 className='w-5 h-5 animate-spin' />:(
                                <Button onClick={()=>setShowPositionRestrictionModal(true)} variant='ghost' size='sm'>
                                    <PlusCircle className='w-5 h-5' />
                                </Button>
                            )
                        }
                    </div>
                    {course.position_restrictions.length<1 ? <p className='text-xs'>This Course is Visible To All Positions</p>:<p className='text-xs'>This Course is Visible Only to the Positions Below</p>}  
                    <div className='flex flex-wrap gap-1.5'>
                        {
                            course.position_restrictions.map(posi=> (
                                <div key={posi.id} className='border border-muted-foreground rounded py-1 px-2 flex space-x-2.5 items-center text-sm'>
                                    <p>{posi.position}</p>
                                    <Button variant='ghost' size='sm' onClick={()=>Inertia.post(route('teacher.courses.restrictions.positions.destroy',{
                                        course_id:course.id,
                                        id:posi.id
                                    }))}>
                                        <Trash2 className='w-5 h-5 text-destructive' />
                                    </Button>
                                </div>
                            ))
                        }
                    </div>
                </div>
                
            </div>
            {!!departments&& <DepartmentRestrictionModal allowedDepartments={course.department_restrictions.map(dept=>dept.department)} courseId={course.id} open={showDepartmentRestrictionModal} onClose={()=>setShowDepartmentRestrictionModal(false)} departments={departments} />}
            {!!positions&& <PositionRestrictionModal allowedPositions={course.position_restrictions.map(posi=>posi.position)} courseId={course.id} open={showPositionRestrictionModal} onClose={()=>setShowPositionRestrictionModal(false)} positions={positions} />}
        </>
    )
}

export default RestrictionForm;


interface DepartmentRestrictionModalProps{
    courseId:number;
    allowedDepartments?:string[];
    departments:string[];
    open?:boolean;
    onClose:()=>void;
}

const DepartmentRestrictionModal:FC<DepartmentRestrictionModalProps> = ({departments,allowedDepartments,open,onClose,courseId}) => {
    const [selectedDepartments,setSelectedDepartments] = useState<string[]>([]);
    const [loading,setLoading] = useState(false);
    const popoverCloseRef = useRef<HTMLButtonElement>(null);
    const onSelect = (department:string) =>{
        if(selectedDepartments.findIndex(d=>d===department) >-1) return ;//setSelectedDepartments(selectedDepartments.filter(d=>d!==department)) ;
        setSelectedDepartments([...selectedDepartments,department]);
        popoverCloseRef.current?.click();
    }
    const combined = [...(allowedDepartments||[]),...selectedDepartments];    

    useEffect(()=>setSelectedDepartments([]),[open]);

    const onSubmit = () =>{
        Inertia.post(route('teacher.courses.restrictions.departments.store',courseId),{departments:selectedDepartments},{
            onStart:()=>setLoading(true),
            onFinish:()=>setLoading(false),
            onError:()=>toast.error('Something went wrong. Please try again.'),
            onSuccess:()=>{
                toast.success('Restriction Added Successfully');
                onClose();
            }
        });
    }

    if(!open) return null;

    return (
        <Dialog open={open} onOpenChange={onClose} modal>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add Department Restriction</DialogTitle>
                <DialogDescription>
                    This course will only be visible to students in the selected departments.
                </DialogDescription>
                </DialogHeader>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="outline" className='flex justify-between items-center'>
                            <span>Select a Department</span>
                            <ChevronsUpDownIcon className='w-5 h-5' />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                        <Command>
                            <CommandList className='max-h-[15rem] '>
                                <CommandInput className='my-2.5' placeholder="Search department..." />
                                <CommandEmpty>No department found.</CommandEmpty>
                                <CommandGroup  heading='Departments' >
                                    {departments.map(department => (
                                        <CommandItem key={department} onSelect={()=>onSelect(department)} className="text-sm" >
                                            {department}
                                            <CheckIcon
                                                className={cn(
                                                "ml-auto h-4 w-4",
                                                combined.findIndex(d=>d===department) >-1? "opacity-100": "opacity-0"
                                                )}
                                            />
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                                    
                            </CommandList>
                            <CommandSeparator />
                        </Command>
                    </PopoverContent>
                    <PopoverClose ref={popoverCloseRef} />
                </Popover>
                <div className='flex flex-wrap gap-1.5'>
                    {
                        combined.map(dept=> <Button size='sm'>{dept}</Button>)
                    }
                </div>
                <DialogFooter>
                    <Button onClick={onSubmit} disabled={loading || selectedDepartments.length<1} variant='ddc' type="submit">
                        Save changes
                        {loading && <Loader2 className='w-5 h-5 ml-2 animate-spin' />}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}



interface PositionRestrictionModalProps{
    courseId:number;
    allowedPositions?:string[];
    positions:string[];
    open?:boolean;
    onClose:()=>void;
}

const PositionRestrictionModal:FC<PositionRestrictionModalProps> = ({positions,allowedPositions,open,onClose,courseId}) => {
    
    const [loading,setLoading] = useState(false);
    const [selectedPositions,setSelectedPositions] = useState<string[]>([]);
    const popoverCloseRef = useRef<HTMLButtonElement>(null);
    const onSelect = (position:string) =>{
        if(selectedPositions.findIndex(d=>d===position) >-1) return ;//setSelectedPositions(selectedPositions.filter(d=>d!==position)) ;
        setSelectedPositions([...selectedPositions,position]);
        popoverCloseRef.current?.click();
    }
    const combined = [...(allowedPositions||[]),...selectedPositions];    

    useEffect(()=>setSelectedPositions([]),[open]);

    const onSubmit = () =>{
        Inertia.post(route('teacher.courses.restrictions.positions.store',courseId),{positions:selectedPositions},{
            onStart:()=>setLoading(true),
            onFinish:()=>setLoading(false),
            onError:()=>toast.error('Something went wrong. Please try again.'),
            onSuccess:()=>{
                toast.success('Restriction Added Successfully');
                onClose();
            }
        });
    }

    if(!open) return null;

    return (
        <Dialog open={open} onOpenChange={onClose} modal>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add Position Restriction</DialogTitle>
                <DialogDescription>
                    This course will only be visible to students in the selected positions.
                </DialogDescription>
                </DialogHeader>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="outline" className='flex justify-between items-center'>
                            <span>Select a Position</span>
                            <ChevronsUpDownIcon className='w-5 h-5' />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                        <Command>
                            <CommandList className='max-h-[15rem] '>
                                <CommandInput className='my-2.5' placeholder="Search position..." />
                                <CommandEmpty>No position found.</CommandEmpty>
                                <CommandGroup  heading='Positions' >
                                    {positions.map(position => (
                                        <CommandItem key={position} onSelect={()=>onSelect(position)} className="text-sm" >
                                            {position}
                                            <CheckIcon
                                                className={cn(
                                                "ml-auto h-4 w-4",
                                                combined.findIndex(d=>d===position) >-1? "opacity-100": "opacity-0"
                                                )}
                                            />
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                                    
                            </CommandList>
                            <CommandSeparator />
                        </Command>
                    </PopoverContent>
                    <PopoverClose ref={popoverCloseRef} />
                </Popover>
                <div className='flex flex-wrap gap-1.5'>
                    {
                        combined.map(dept=> <Button size='sm'>{dept}</Button>)
                    }
                </div>
                <DialogFooter>
                    <Button onClick={onSubmit} disabled={loading || selectedPositions.length<1} variant='ddc' type="submit">
                        Save changes
                        {loading && <Loader2 className='w-5 h-5 ml-2 animate-spin' />}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}


