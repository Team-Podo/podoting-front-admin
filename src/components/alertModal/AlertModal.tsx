import {AlertProps} from "../../models/alert";
import {AlertModalStyle} from "./AlertModalStyle";

function AlertModal({msg, display, onClick}: { msg: string, display: boolean, onClick: (state:boolean)=>void }) {

    return display ? <AlertModalStyle>
        <div className={"modal alert"}>
            <p>{msg}</p>
            <button className={"alert-confirm"} onClick={() => onClick(false)}>확인</button>
        </div>
    </AlertModalStyle> : null
}

export default AlertModal