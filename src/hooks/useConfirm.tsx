import {useDispatch} from "react-redux";
import {ask} from "../modules/confirm";

export function useConfirm() {
    const dispatch = useDispatch()

    return (content:string, next:() => void) => {
        dispatch(ask(content, true, next))
    }
}