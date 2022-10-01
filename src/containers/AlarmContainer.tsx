import {useSelector} from "react-redux";
import Alarm from "../components/Alarm";
import {RootState} from "../modules";

function AlarmContainer() {
    const msg = useSelector((state:RootState) => state.alarm.content)
    const display = useSelector((state:RootState) => state.alarm.display)

    return <Alarm content={msg} display={display}/>
}

export default AlarmContainer

