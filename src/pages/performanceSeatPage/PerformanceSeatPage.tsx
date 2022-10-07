import {DetailWrapper} from "../performanceDetailPage/PerformanceDetailPage.style";
import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import Menu from "../../components/Menu/Menu";
import {SeatPageStyle} from "./SeatPage.style";
import sampleSeatSrc from "../../assets/sampleseat.gif"
import SeatItem from "../../components/SeatItem/SeatItem";
import {getSeats, saveSeats} from "../../apis/seats";
import {Grade, Seat} from "../../models/seat";
import {getGrades} from "../../apis/grades";

function PerformanceSeatPage() {
    const {performanceID} = useParams()
    const areaID = 26;
    const [seats, setSeats] = useState<Seat[]>([])
    const [activeSeat, setActiveSeat] = useState<{uuid:string, grade:Grade}>({
        grade: {id: 0, price: 0, color: "", name: ""},
        uuid: ""
    })
    const [grades, setGrades] = useState<Grade[]>([])

    useEffect(function () {
        if(performanceID) {
            getSeats({performanceID, areaID: areaID}).then((res) => {
                setSeats(res)
            })
            getGrades({performanceID}).then((res) => setGrades(res.data))
        }
    }, [performanceID])

    useEffect(function () {
        if (activeSeat.uuid !== "") {
            setSeats([...seats.map((s) => {
                if (s.uuid === activeSeat.uuid) {
                    s.grade = activeSeat.grade
                }
                return s
            })])
        }
    }, [activeSeat])


    function onChangeGrade(e: React.ChangeEvent<HTMLInputElement>) {
        if (activeSeat) {
            const grade = grades.find((g) => g.id === Number(e.currentTarget.value))
            setActiveSeat({
                uuid: activeSeat.uuid,
                grade: grade!
            })
        }
    }

    function onClickSubmitBoard() {
        const seatArray = seats.map((s) => {
            return {
                uuid: s.uuid,
                gradeID: s.grade.id
            }
        })
        if ( performanceID && areaID) { saveSeats({performanceID, areaID, seatArray}).then((res) => {
            if(res.status === 200) {

            }
        }) }
    }

    function onClickGetPoint(e: React.MouseEvent<HTMLImageElement>) {
    }

    function setActiveSeatHandler(uuid: string, grade: Grade) {
        if (seats?.filter((s) => s.uuid === uuid)[0]) {
            setActiveSeat(seats?.filter((s) => s.uuid === uuid)[0])
        } else {
            setActiveSeat({uuid: uuid, grade: grade})
        }
    }

    return <DetailWrapper>
        <div className="info common-section">
            <div className="wrapper">
                <div className="info-left">
                    <SeatPageStyle>
                        <div className={"seat-map-image"}>
                            <img src={sampleSeatSrc} alt={"좌석표"} onClick={onClickGetPoint}/>
                            {activeSeat?.uuid !== "" &&
                            <form className={"seat-map-canvas"}>
                                <div>
                                    <p>선택된 좌석: {activeSeat?.uuid}</p>
                                </div>
                                <div>
                                    {grades && grades.map((g) => <div key={g.id}>
                                        <label htmlFor={"grade"}>{g.name}</label>
                                        <input type={"checkbox"} name={"grade"} value={g.id}
                                               checked={g.id === activeSeat?.grade.id} onChange={onChangeGrade}/>
                                    </div>)}
                                </div>
                            </form>
                            }
                            <button className="submit-seat" onClick={onClickSubmitBoard}>저장</button>
                            {seats && seats.map((s) =>
                                <SeatItem key={s.uuid} uuid={s.uuid} grade={s.grade} point={s.point}
                                          onClick={setActiveSeatHandler}
                                          active={activeSeat?.uuid === s.uuid}></SeatItem>)}
                        </div>
                        {/*
                            <ul>
                                {seats && seats.map((s) => <li key={s.uuid}>
                                    {`id:${s.uuid}`}
                                </li>)}
                            </ul>
                        */}
                    </SeatPageStyle>
                </div>
                <Menu current={"seat"} performanceID={performanceID!}/>
            </div>
        </div>
    </DetailWrapper>
}

export default PerformanceSeatPage