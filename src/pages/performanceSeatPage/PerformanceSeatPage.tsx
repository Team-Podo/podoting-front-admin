import {DetailWrapper} from "../performanceDetailPage/PerformanceDetailPage.style";
import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import Menu from "../../components/menu/Menu";
import {SeatPageStyle} from "./SeatPage.style";
import SeatItem from "../../components/seatItem/SeatItem";
import {getSeats, saveSeats} from "../../apis/seats";
import {Grade, Seat} from "../../models/seat";
import {createGrade, getGrades} from "../../apis/grades";
import {useForm} from "react-hook-form";
import useAlarm from "../../hooks/useAlarm";

function PerformanceSeatPage() {
    const {performanceID} = useParams()
    const [loaded, setLoaded] = useState(false)
    const areaID = 26;
    const [seats, setSeats] = useState<Seat[]>([])
    const [activeSeat, setActiveSeat] = useState<{ uuid: string, grade: Grade }>({
        grade: {id: 0, price: 0, color: "", name: ""},
        uuid: ""
    })
    const [grades, setGrades] = useState<Grade[]>([])
    const [bgImg, setBgImg] = useState("")
    const setAlarm = useAlarm()
    const {register, handleSubmit} = useForm<Grade>()

    useEffect(function () {
        if (performanceID) {
            getSeats({performanceID, areaID: areaID}).then((res) => {
                setSeats(res.seats)
                setBgImg(res.backgroundImage)
                setLoaded(true)
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
                gradeID: s.grade.id!
            }
        })
        if (performanceID && areaID) {
            saveSeats({performanceID, areaID, seatArray}).then((res) => {
                if (res.status === 200) {

                }
            })
        }
    }

    function setActiveSeatHandler(uuid: string, grade: Grade) {
        if (seats?.filter((s) => s.uuid === uuid)[0]) {
            setActiveSeat(seats?.filter((s) => s.uuid === uuid)[0])
        } else {
            setActiveSeat({uuid: uuid, grade: grade})
        }
    }

    const onSubmit = handleSubmit((async data => {
        performanceID && createGrade({performanceID, data}).then((res) => {
            setAlarm("가격 정보가 생성되었습니다.")
        })
    }))

    return <DetailWrapper>
        {loaded &&
        <div className="common-section">
            <div className="wrapper">
                <div className="info-left">
                    <SeatPageStyle>
                        <div className={"seat-map-image"}>
                            <img src={bgImg} alt={"좌석표"}/>
                            {activeSeat?.uuid !== "" &&
                            <form className={"seat-map-canvas"}>
                                <div>
                                    <div>선택된 좌석: {activeSeat?.uuid}</div>
                                </div>
                                <div className={"input-wrapper"}>
                                    <p>등급: </p>
                                    {grades && grades.map((g) => <div key={g.id}>
                                        <label htmlFor={"grade"}>{g.name}</label>
                                        <input type={"checkbox"} name={"grade"} value={g.id}
                                               checked={g.id === activeSeat?.grade.id} onChange={onChangeGrade}/>
                                    </div>)}
                                </div>
                            </form>
                            }
                            <button className="submit-seat button" onClick={onClickSubmitBoard}>저장</button>
                            {seats && seats.map((s) =>
                                <SeatItem key={s.uuid} uuid={s.uuid} grade={s.grade} point={s.point}
                                          onClick={setActiveSeatHandler}
                                          active={activeSeat?.uuid === s.uuid}></SeatItem>)}
                        </div>
                        <form className={"grade-form"} onSubmit={onSubmit}>
                            <p>* 가격 등급 생성하기</p>
                            <div className={"input-wrapper"}>
                                <label>등급 이름: </label>
                                <input type={"text"} {...register("name")} placeholder={"VIP"} required={true}/>
                            </div>
                            <div className={"input-wrapper"}>
                                <label>등급 가격: </label>
                                <input type={"number"} {...register("price")} placeholder={"150000"} required={true}/>
                            </div>
                            <div className={"input-wrapper"}>
                                <label>등급 색상: </label>
                                <input type={"text"} {...register("color")} placeholder={"#e5e5e5"} required={true}/>
                            </div>
                            <button type={"submit"} className={"button"}>생성</button>
                        </form>
                    </SeatPageStyle>
                </div>
                <Menu current={"seat"} performanceID={performanceID!}/>
            </div>
        </div>
        }
    </DetailWrapper>
}

export default PerformanceSeatPage