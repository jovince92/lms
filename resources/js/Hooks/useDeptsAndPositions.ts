import { Position } from '@/types';
import axios from 'axios';
import { toast } from 'sonner';
import {create} from 'zustand';

type Store = {
    getData:()=>Promise<void>;
    departments?:string[];
    positions?:string[];
}

export const useDeptsAndPositions = create<Store>(set=>({
    getData:async()=>{
        try{
            const {data}=(await axios.get(route('api.positions'))) as {data:Position[]};
            set({
                departments:([...new Set(data.map(p=>p.department))]).sort(),
                positions:([...new Set(data.map(p=>p.designation))]).sort(),
            });
        }catch(e){
            console.error(e);
            toast.error('An error occured while fetching departments and positions');
        }
    },
}));