import {SeatItemStyle} from "../SeatItem/SeatItem.style";
import {SeatInfoStyle} from "./SeatInfo.style";
import {useState} from "react";

interface Seat {
    id: string,
    color: string,
    grade: string,
    rowId: string
}

interface SeatInfoProps{
    idx: number,
    seat: Seat
    onClick: (seat:Seat) => void
}

function SeatInfo({idx, seat, onClick}: SeatInfoProps) {
    const [isActive, setIsActive] = useState(false)
    function onClickSetActive() {
        onClick(seat)
    }

    return <SeatInfoStyle>
        <td onClick={onClickSetActive}>{`${idx+1}번 - 등급:${seat.grade}`}</td>
    </SeatInfoStyle>
}

export default SeatInfo