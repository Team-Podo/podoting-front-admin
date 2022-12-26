import moment from "moment";
import React, {useEffect, useState} from "react";
import {Schedule} from "../../models/schedule";
import {useForm} from "react-hook-form";
import {CastList} from "../../models/cast";
import {createSchedule, deleteSchedule, editSchedule} from "../../apis/schedule";
import useAlarm from "../../hooks/useAlarm";

interface ScheduleFormProps {
    performanceID: string
    activeDate: Date
    schedule?: Schedule
    castList: CastList[]
    characterList: string[]
    refresh: () => void
}

function ScheduleForm({performanceID, activeDate, schedule, castList, characterList, refresh}: ScheduleFormProps) {
    const {register, handleSubmit, reset} = useForm()
    const [selectedCastList, setSelectedCastList] = useState<number[]>([])
    const [date, setDate] = useState("")
    const setAlarm = useAlarm()

    useEffect(() => {
        setDate(moment(activeDate).format("YYYY-MM-DD"))
        if (schedule?.casts) setSelectedCastList(schedule.casts)
        reset({date: date})
    }, [activeDate])

    function onClickCastLi(e: React.MouseEvent<HTMLLIElement>) {
        const castID = e.currentTarget.value
        if (selectedCastList.find((cast) => castID === cast)) {
            const newArr = selectedCastList.filter((sc) => {
                if (sc !== castID) {
                    return sc
                }
            })
            setSelectedCastList(newArr)
        } else {
            setSelectedCastList([...selectedCastList, castID])
        }
    }

    const onSubmit = handleSubmit(async data => {
        data.casts = selectedCastList
        data.date = date
        if (schedule) {
            const UUID = schedule.uuid!
            editSchedule({UUID, data}).then((res) => {
                if (res.status === 200) {
                    setAlarm("스케줄이 수정되었습니다")
                    refresh()
                }
            })
        } else {
            createSchedule({performanceID, data}).then((res) => {
                if (res.status === 201) {
                    setAlarm("스케줄이 생성되었습니다")
                }
                refresh()
            })
        }
    })

    function onClickDeleteSchedule(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault()
        const UUID = e.currentTarget.value
        deleteSchedule({UUID}).then((res) => {
            if (res.status === 200) {
                setAlarm("스케줄이 삭제되었습니다")
                refresh()
            }
        })
    }

    return <form className={"schedule-edit"} onSubmit={onSubmit}>
        <p>{schedule ? "* 스케줄 수정" : "* 새로운 스케줄 생성"}</p>
        <div className={"input-wrapper"}>
            <label>상태: </label>
            <span>활성화</span>
            <input type={"checkbox"} {...register("open")} checked={schedule?.open}/>
        </div>
        <div className={"input-wrapper"}>
            <label>날짜: </label>
            <input type={"text"} disabled={true} value={date}/>
        </div>
        <div className={"input-wrapper"}>
            <label>시간: </label>
            <input type={"time"} {...register("time")} defaultValue={schedule?.time}/>
        </div>
        <div className={"input-wrapper"}>캐스팅</div>
        {characterList && characterList.map((ch) =>
            <div className={"cast-list"} key={ch}>
                <div>{ch}</div>
                <ul className={"actor-list"}>
                    {castList && castList.map((c) => {
                        if (c.characterName === ch) {
                            return <li key={c.id} value={c.id} onClick={onClickCastLi}
                                       className={selectedCastList.find((a) => a === c.id) ? "active" : ""}>{c.personName}</li>
                        }
                    })}
                </ul>
            </div>
        )}
        {schedule ?
            <div className={"margin-top-2"} style={{textAlign: "right"}}>
                <button className={"btn-small"} value={schedule.uuid} onClick={onClickDeleteSchedule}>삭제</button>
                <button className={"btn-small"} type={"submit"}>수정</button>
            </div>
            :

            <div className={"margin-top-2"} style={{textAlign: "right"}}>
                <button className={"btn-small"} type={"submit"}>생성</button>
            </div>
        }
    </form>
}

export default ScheduleForm