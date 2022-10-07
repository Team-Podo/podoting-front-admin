import {SeatItemStyle} from "./SeatItem.style";
import {Grade, Seat} from "../../models/seat";

interface SeatProps extends Seat {
    onClick: (uuid:string, grade:Grade) => void
    active: boolean
}

function SeatItem({uuid, grade, point, onClick, active}:SeatProps) {
    function setActiveSeat() {
        if(active){
            onClick("", {id: 0, color:"", price:0, name:""})
        }else{
            onClick(uuid, grade)
        }
    }
    return <SeatItemStyle color={grade.color} className={`seat${active? " active" : ""}${grade? "" : " unset"}`} point={point} onClick={setActiveSeat}>
    </SeatItemStyle>
}

export default SeatItem