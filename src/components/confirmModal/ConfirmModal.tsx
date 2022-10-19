import {AlertModalStyle} from "../alertModal/AlertModalStyle";


function ConfirmModal({msg, display, onClick, next}: { msg: string, display: boolean, onClick: (state:boolean)=>void, next:any}) {

    return display ? <AlertModalStyle>
        <div className={"modal alert"}>
            <p>{msg}</p>
            <button className={"alert-confirm"} onClick={next}>확인</button>
            <button className={"alert-cancel"} onClick={() => onClick(false)}>취소</button>
        </div>
    </AlertModalStyle> : null
}

export default ConfirmModal