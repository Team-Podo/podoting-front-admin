import {DetailWrapper} from "../performanceDetailPage/PerformanceDetailPage.style";
import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import Menu from "../../components/Menu/Menu";
import "../../calendar.css"
import {Calendar} from "react-calendar";
import moment from "moment";

interface scheduledDate {
    date: string,
    schedule: string
}

function SchedulePage() {
    const {id} = useParams()
    const navigate = useNavigate()
    const [opened, setOpened] = useState<scheduledDate[]>([])
    const [activeDate, setActiveDate] = useState(new Date())

    useEffect(function () {
        const sampleSchedules = [{
            date: "2022-09-28",
            schedule: ""
        },{
            date: "2022-09-30",
            schedule: ""
        }]
        setOpened(sampleSchedules)
    }, [])

    return <DetailWrapper>
        <div className="info common-section">
            <div className="wrapper">
                <div className="info-left">
                    <Calendar
                        calendarType={"US"}
                        value={activeDate}
                        onChange={setActiveDate}
                        tileClassName={({date}) => {
                        if (opened.find((o) => o.date == moment(date).format("YYYY-MM-DD"))) {
                            console.log(moment(date).format("YYYY-MM-DD"))
                            return "scheduled"
                        } else { console.log(moment(date).format("YYYY-MM-DD")); return "noo"}
                    }}/>
                    <div className={"schedule-edit"}>
                        <div>날짜: {moment(activeDate).format("YYYY-MM-DD")}</div>
                        <div>시간: </div>
                        <div>캐스팅: <input type={"text"} placeholder={"캐스팅을 입력해주세요"}/></div>
                    </div>
                </div>
                <Menu current={"schedule"} id={id}/>
            </div>
        </div>
    </DetailWrapper>
}

export default SchedulePage