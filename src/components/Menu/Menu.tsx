import React from "react";
import {useNavigate} from "react-router-dom";

interface MenuProps {
    performanceID: string
    current: string
}

function Menu({performanceID, current}:MenuProps) {
    const navigate = useNavigate()

    return <>
        <ul className="detail-tab">
            <li className={ current === "info" ? "active" : ""} onClick={() => navigate(`/performance/edit/${performanceID}`)}>기본정보</li>
            <li className={ current === "cast" ? "active" : ""} onClick={() => {navigate(`/performance/cast/${performanceID}`)}}>캐스팅</li>
            <li className={ current === "content" ? "active" : ""} onClick={() => {navigate(`/performance/content/${performanceID}`)}}>컨텐츠</li>
            <li className={ current === "seat" ? "active" : ""} onClick={() => navigate(`/performance/${performanceID}/area/`)}>좌석/등급</li>
            <li className={ current === "schedule" ? "active" : ""} onClick={() => navigate(`/performance/schedule/${performanceID}`)}>스케줄</li>
        </ul>
    </>

}

export default Menu