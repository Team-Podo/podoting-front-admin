import {AlertProps} from "../../models/alert";

function AlertModal({setDisplay, display, message}: AlertProps) {

    return display ? <div className={"modal-container"}>
        <div className={"modal alert"}>
            <p>{message}</p>
            <button className={"alert-confirm"} onClick={() => setDisplay && setDisplay(false, "")}>확인</button>
        </div>
    </div> : null
}

export default AlertModal