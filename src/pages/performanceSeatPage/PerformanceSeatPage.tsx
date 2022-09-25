import {DetailWrapper} from "../performanceDetailPage/PerformanceDetailPage.style";
import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import Menu from "../../components/Menu/Menu";
import {SeatPageStyle} from "./SeatPage.style";
import sampleSeatSrc from "../../assets/sampleseat.gif"
import SeatItem from "../../components/SeatItem/SeatItem";


interface Seat {
    id: number,
    color: string
    grade: string
    point?: {
        x: number
        y: number
    }
}

interface Grade {
    id: string,
    name: string,
    color: string
}

function PerformanceSeatPage() {
    const {id} = useParams()
    const navigate = useNavigate()
    const [place, setPlace] = useState("")
    const [seats, setSeats] = useState<Seat[]>([])
    const [activeSeat, setActiveSeat] = useState<Seat>({ id:0, color:"", grade:""})
    const [grades, setGrades] = useState<Grade[]>([])

    useEffect(function () {
        const sampleGrades = [{
            id: "idVIP",
            name: "VIP",
            color: "#764abc"
        }, {
            id: "idR",
            name: "R",
            color: "blue"
        }]
        setGrades(sampleGrades)
        const sampleSeats = [{
            id: 1,
            color: "",
            grade: "",
            point: {
                x: 217,
                y: 201
            }
        },{
            id: 2,
            color: "",
            grade: "",
            point: {
                x: 233,
                y: 201
            }
        },{
            id: 3,
            color: "",
            grade: "",
            point: {
                x: 265,
                y: 201
            }
        },{
            id: 4,
            color: "",
            grade: "",
            point: {
                x: 281,
                y: 201
            }
        }]

        setSeats(sampleSeats)
    }, [])

    useEffect(function () {
        if(activeSeat.id !== 0) {
            setSeats([...seats.map((s) => {
                if (s.id === activeSeat.id) {
                    s.color = activeSeat.color
                    s.grade = activeSeat.grade
                }
                return s
            })])
        }
    }, [activeSeat])


    function onChangeGrade(e: React.ChangeEvent<HTMLInputElement>) {
        if (activeSeat) {
            setActiveSeat({
                id: activeSeat.id,
                color: grades.filter((g) => g.id === e.currentTarget.value)[0].color,
                grade: e.currentTarget.value
            })
        }
    }

    function storeActiveSeat(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault()
        if (activeSeat) {

        }
    }

    function onClickSubmitBoard() {

    }

    function onClickGetPoint(e: React.MouseEvent) {
        const point = {
            x: e.clientX,
            y: e.clientY
        }
        console.log(point)
    }

    function setActiveSeatHandler(id:number, color:string, grade:string) {
        if(seats?.filter((s) => s.id == id)[0]) {
            setActiveSeat(seats?.filter((s) => s.id == id)[0])
        } else {
            setActiveSeat({id:0, color:"", grade:""})
        }
    }

    return <DetailWrapper>
        <div className="info common-section">
            <div className="wrapper">
                <div className="info-left">
                    <SeatPageStyle>
                        <div className={"seat-map-image"}>
                            <img src={sampleSeatSrc} onClick={onClickGetPoint}/>
                            {activeSeat?.id !== 0 &&
                            <form className={"seat-map-canvas"}>
                                <div>
                                    <label htmlFor={"id"}>선택된 좌석</label>
                                    <input name={"id"} readOnly={true} value={activeSeat?.id}/>
                                </div>
                                <div>
                                    {grades && grades.map((g) => <div key={g.id}>
                                        <label htmlFor={"grade"}>{g.name}</label>
                                        <input type={"checkbox"} name={"grade"} value={g.id}
                                               checked={g.id === activeSeat?.grade} onChange={onChangeGrade}/>
                                    </div>)}
                                </div>
                            </form>
                            }
                            <button className="submit-seat" onClick={onClickSubmitBoard}>저장</button>
                            { seats && seats.map((s) => s.point && <SeatItem key={s.id} id={s.id} color={s.color} point={s.point} grade={s.grade} onClick={setActiveSeatHandler} active={activeSeat?.id===s.id}></SeatItem>)}
                        </div>
                        <ul>
                            { seats && seats.map((s) => <li key={s.id}>
                                {`id:${s.id}, name:1층 1열 n번, grade:${s.grade}`}
                            </li>) }
                        </ul>
                    </SeatPageStyle>

                </div>
                <Menu current={"seat"} id={id}/>
            </div>
        </div>
    </DetailWrapper>
}

export default PerformanceSeatPage