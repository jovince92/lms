import { Course } from '@/types';
import React, { FC } from 'react'


interface Props{
    course:Course;
}

const CourseSideBar:FC<Props> = ({course}) => {
    return (
        <div>CourseSideBar</div>
    )
}

export default CourseSideBar