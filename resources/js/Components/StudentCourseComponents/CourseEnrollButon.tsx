import { Course } from '@/types'
import React, { ButtonHTMLAttributes, FC, forwardRef } from 'react'
import { Button } from '../ui/button';

interface Props  extends ButtonHTMLAttributes<HTMLButtonElement>{
    course:Course;
}

const CourseEnrollButon = forwardRef<HTMLButtonElement,Props>(({course,onClick},ref) => {

    return (
        <Button className='w-full md:w-auto' size='sm' ref={ref}>
            Start Course {course.title}
        </Button>
    )
})

export default CourseEnrollButon