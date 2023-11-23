import React, { FC, ReactNode } from 'react'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog';

interface Props{
    children:ReactNode;
    onConfirm:()=>void;
    label?:string;
}

const ConfirmModal:FC<Props> = ({children,onConfirm,label="This can not be undone!"}) => {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
            <AlertDialogContent>
                
                <AlertDialogHeader>
                    <AlertDialogTitle>Are You Sure?</AlertDialogTitle>
                    <AlertDialogDescription>{label}</AlertDialogDescription>
                </AlertDialogHeader>
                
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={onConfirm}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default ConfirmModal