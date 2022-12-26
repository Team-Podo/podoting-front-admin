import {DetailWrapper} from "../performanceDetailPage/PerformanceDetailPage.style";
import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import Menu from "../../components/menu/Menu";
import "../../calendar.css"
import {Calendar} from "react-calendar";
import moment from "moment";
import {SchedulePageStyle} from "./SchedulePage.style";
import {getSchedules} from "../../apis/schedule";
import {CastList} from "../../models/cast";
import ScheduleForm from "../../components/scheduleForm/ScheduleForm";
import {Schedule} from "../../models/schedule";
import {getCharacters} from "../../apis/characters";


function SchedulePage() {
    const {performanceID} = useParams()
    const [schedules, setSchedules] = useState<Schedule[]>([])
    const [activeDate, setActiveDate] = useState(new Date())
    const [period, setPeriod] = useState({startDate: "2022-10-01", endDate: "2029-12-31"})
    const [castList, setCastList] = useState<CastList[]>([])
    const [characterList, setCharacterList] = useState([""])

    useEffect(function () {
        refreshSchedules()
    }, [performanceID])

    function refreshSchedules() {
        if (performanceID) {
            getSchedules({performanceID}).then((res) => {
                setPeriod({startDate: res.performance.startDate, endDate: res.performance.endDate})
                setCastList(res.casts)
                setSchedules(res.schedules)
                setActiveDate(new Date(res.performance.startDate))
            })
            getCharacters({performanceID}).then((res) => {
                const names = res.data.map((ch) => {
                    return ch.name
                })
                setCharacterList(names)
            })
        }
    }

    useEffect(() => {
        setSchedules(schedules)
    }, [activeDate])

    function checkStatus(date: Date) {
        const today = moment(date).format("YYYY-MM-DD")
        let className = ""

        if( schedules && schedules.length>0) {
            schedules.filter((s) => {
                if (s.date === today) {
                    if (!s.open) {
                        className = "closed"
                    } else if (s.open) {
                        className = "scheduled"
                    }
                }
            })
        }
        return className
    }

    function checkPeriod(date: Date) {
        const today = moment(date).format("YYYY-MM-DD")
        if (today >= period.startDate && today <= period.endDate) {
            return false
        } else {
            return true
        }
    }

    function findSchedule(date: Date) {
        const today = moment(activeDate).format("YYYY-MM-DD")
        const sch = schedules.filter((schs) => {
            if (schs.date === moment(activeDate).format("YYYY-MM-DD")) return schs
        })
        return sch
    }

    return <DetailWrapper>
        <div className="common-section">
            <div className="wrapper">
                    <SchedulePageStyle>
                        <Calendar
                            tileDisabled={({date}) => checkPeriod(date)}
                            calendarType={"US"}
                            value={activeDate}
                            onChange={setActiveDate}
                            tileClassName={({date}) => checkStatus(date)}/>
                        <div className={"flex-row schedule-edit-box"}>
                            <ScheduleForm performanceID={performanceID!} activeDate={activeDate} castList={castList}
                                          characterList={characterList} refresh={refreshSchedules}/>
                            <div>
                                { ( schedules && schedules.length > 0 ) && findSchedule(activeDate).map((sch) =>
                                    <ScheduleForm performanceID={performanceID!} activeDate={activeDate} schedule={sch}
                                                  key={sch.uuid}
                                                  castList={castList} characterList={characterList}
                                                  refresh={refreshSchedules}/>
                                )}
                            </div>
                        </div>
                    </SchedulePageStyle>
                <Menu current={"schedule"} performanceID={performanceID!}/>
            </div>
        </div>
    </DetailWrapper>
}

export default SchedulePage