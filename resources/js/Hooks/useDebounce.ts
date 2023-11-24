
import { useEffect, useState } from "react";

export const useDebounce = <T>(value: T, delay?: number): T => {
    const [debouncedVal, setDebouncedVal] =  useState<T>(value);

    useEffect(()=>{
        const timer = setTimeout(()=>setDebouncedVal(value),delay||500);
        return()=>clearTimeout(timer);
    },[value,delay]);
    return debouncedVal;
};