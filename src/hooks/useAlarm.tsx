import {useDispatch} from "react-redux";
import {show} from "../modules/alarm";

function useAlarm() {
    const dispatch = useDispatch()

    return (content:string) => {
        dispatch(show(content, true))
        setTimeout(() => dispatch(show(content, false)), 1000)
    }

}

export default useAlarm