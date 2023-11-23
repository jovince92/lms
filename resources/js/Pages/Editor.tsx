import {FC} from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import 'react-quill/dist/quill.bubble.css';

interface Props{
    readonly?:boolean;
    onChange?:(val:string)=>void;
    value:string;
}

const Editor:FC<Props> = ({onChange,value,readonly}) => {
    const theme = readonly?'bubble':'snow';
    return (
        <ReactQuill readOnly={readonly} theme={theme} value={value} onChange={onChange} />
    )
}

export default Editor