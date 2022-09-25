import {SeatItemStyle} from "./SeatItem.style";
import {useState} from "react";

interface Seat {
    id: number,
    color: string
    point: {
        x: number
        y: number
    }
    grade: string
    onClick: (id:number, color:string, grade:string) => void
    active: boolean
}

function SeatItem({id, color, point, grade, onClick, active}:Seat) {
    function setActiveSeat() {
        if(active){
            onClick(0, "", "")
        }else{
            onClick(id, color, grade)
        }
    }
    return <SeatItemStyle color={color} className={`seat${active? " active" : ""}${grade? "" : " unset"}`} point={point} onClick={setActiveSeat}>
    </SeatItemStyle>
}

export default SeatItem