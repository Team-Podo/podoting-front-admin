import {ReactNode, useEffect, useState} from 'react';
import ReactDom from 'react-dom';

interface Props {
    children: ReactNode;
}

const ModalPortal = ({ children }: Props) => {
    const [mounted, setMounted] = useState(false)
    useEffect(() => setMounted(true), [])

    const el = document.getElementById('modal-root')!

    return mounted ? ReactDom.createPortal(children, el) : null;
};

export default ModalPortal;