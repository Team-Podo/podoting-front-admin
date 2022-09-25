import React, {useEffect, useState} from "react";
import {getPerformances} from "../../apis/performances";
import {performances} from "../../models/performances";
import {useNavigate} from "react-router-dom";

function PerformanceListPage() {
    const [performances, setPerformances] = useState<performances[]>()
    const navigate = useNavigate()

    useEffect(function () {
        getPerformances().then((res) => {
            setPerformances(res)
        })
    }, [])

    function onClickPerformanceCreate() {
        navigate("/performance/create")
    }

    return <>
        <div className={"common-section"}>
            <table>
                <thead>
                <tr>
                    <td>id</td>
                    <td>상태</td>
                    <td>제목</td>
                    <td>기간</td>
                    <td>생성일자</td>
                </tr>
                </thead>
                <tbody>
                { performances && performances.map((pf) =>
                    <tr key={pf.id}>
                        <td>{pf.id}</td>
                        <td>판매중</td>
                        <td onClick={() => {
                            window.location.href =`/performance/${pf.id}`
                        }}>{pf.title}</td>
                        <td>{pf.startDate} ~ {pf.endDate}</td>
                        <td>{pf.createdAt.slice(0, 10)}</td>
                    </tr>
                )}
                </tbody>
            </table>
            <button className={"button"} onClick={onClickPerformanceCreate}>생성</button>
        </div>
    </>
}

export default PerformanceListPage