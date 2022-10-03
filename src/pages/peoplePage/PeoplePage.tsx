import React, {useEffect, useState} from "react";
import {getPeople} from "../../apis/people";
import {People} from "../../models/people";

function PeoplePage() {
    const [people, setPeople] = useState<People[]>([])

    useEffect(() => {
        getPeople().then((res) => {
            setPeople(res)
        })
    }, [])


    return <>
        <div className={"common-section"}>
            <form>
                <table>
                    <thead>
                    <tr>
                        <th>id</th>
                        <th>프로필</th>
                        <th>이름</th>
                        <th>생년월일</th>
                        <th>-</th>
                    </tr>
                    </thead>
                    <tbody>
                    {people && people.map((p) =>
                        <tr key={p.id}>
                            <td>{p.id}</td>
                            <td>프로필 이미지</td>
                            <td>{p.name}</td>
                            <td>{p.birth}</td>
                            <th><button className={"btn-small"}>수정</button>
                                <button className={"btn-small"}>삭제</button></th>
                        </tr>)}
                    <tr>
                        <td></td>
                        <td><input type={"file"}/></td>
                        <td><input type={"text"}/></td>
                        <td><input type={"text"}/></td>
                        <th><button className={"btn-small"}>추가</button></th>
                    </tr>
                    </tbody>
                </table>
            </form>
        </div>
    </>
}

export default PeoplePage