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
            <table className={"margin-bottom-2"}>
                <thead>
                <tr>
                    <th>id</th>
                    <th>썸네일</th>
                    <th>상태</th>
                    <th>제목</th>
                    <th>기간</th>
                    <th>생성일자</th>
                </tr>
                </thead>
                <tbody>
                { performances && performances.map((pf) =>
                    <tr key={pf.id}>
                        <td>{pf.id}</td>
                        <td><img style={{width: "5rem"}} src={pf.thumbUrl} alt={"poster"}/></td>
                        <td>판매중</td>
                        <td onClick={() => {
                            window.location.href =`/performance/edit/${pf.id}`
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