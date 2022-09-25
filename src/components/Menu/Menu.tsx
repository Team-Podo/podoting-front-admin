import React from "react";
import {useNavigate} from "react-router-dom";

interface MenuProps {
    id?: string
    current: string
}

function Menu({id, current}:MenuProps) {
    const navigate = useNavigate()

    if(id){
        return <>
            <ul className="detail-tab">
                <li className={ current === "info" ? "active" : ""} onClick={() => navigate(`/performance/edit/${id}`)}>기본정보</li>
                <li className={ current === "cast" ? "active" : ""} onClick={() => {navigate(`/performance/cast/${id}`)}}>캐스팅</li>
                <li className={ current === "content" ? "active" : ""} onClick={() => {navigate(`/performance/content/${id}`)}}>컨텐츠</li>
                <li className={ current === "seat" ? "active" : ""} onClick={() => navigate(`/performance/seat/${id}`)}>장소/좌석</li>
                <li className={ current === "schedule" ? "active" : ""} onClick={() => navigate(`/performance/schedule/${id}`)}>스케줄</li>
            </ul>
        </>
    }

    return  <></>

}

export default Menu