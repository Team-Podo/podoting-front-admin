import {useNavigate, useParams} from "react-router-dom";
import {DetailWrapper} from "../performanceDetailPage/PerformanceDetailPage.style";
import React, {useEffect, useState} from "react";
import Menu from "../../components/Menu/Menu";
import {useForm} from "react-hook-form";
import {Cast} from "../../models/cast";
import {createCharacter, deleteCharacter, getCharacters} from "../../apis/characters";
import useAlarm from "../../hooks/useAlarm";


interface Character {
    id: number
    name: string
}

function CastPage() {
    const {performanceID} = useParams()
    const [newRole, setNewRole] = useState("")
    const [roles, setRoles] = useState<Character[]>([])
    const [addCastForm, setAddCastForm] = useState<number[]>([])
    const setAlarm = useAlarm()
    const {register, handleSubmit} = useForm<Cast[]>()

    useEffect(() => {
        refreshCharacters()
    }, [performanceID])

    function refreshCharacters () {
        if (performanceID) {
            getCharacters({performanceID}).then((res) =>
                setRoles(res.data))
        }
    }

    async function addRole() {
        if (performanceID) {
            const res = await createCharacter({performanceID, "name": newRole})
            roles.push({id: res.data, name: newRole})
            setNewRole("")
        }
    }

    function handleOnClickAddCastBtn() {
        if (addCastForm.length === 0) {
            setAddCastForm([0])
        } else {
            setAddCastForm([...addCastForm, (addCastForm[addCastForm.length - 1] + 1)])
        }
    }

    function onClickDeleteCharacter(characterID:number) {
        deleteCharacter({characterID}).then((res) => {
            if(res.status === 400) {
                setAlarm("이미 캐스트에 매칭된 배역이 있습니다. 매칭된 캐스트를 먼저 삭제해 주세요.")
            }
            refreshCharacters()
        })
    }

    function deleteForm(e: React.FormEvent<HTMLButtonElement>) {
        e.preventDefault()
        const key = Number(e.currentTarget.value)
        setAddCastForm([...addCastForm.filter((i) => i !== key)])
    }

    return <>
        <DetailWrapper>
            <div className="common-section">
                <div className="wrapper">
                    <div className="info-left">
                        <div>
                            <h2>뮤지컬 팬레터</h2>
                            <div>배역을 추가해 주세요</div>
                            <ul>
                                {roles && roles.map((r) =>
                                    <li key={r.id}>{r.name}<span className={"remove-li"} onClick={() => onClickDeleteCharacter(r.id)}>삭제</span></li>)}
                            </ul>
                            <input type={"text"} value={newRole} onChange={(e) => setNewRole(e.currentTarget.value)}/>
                            <button onClick={addRole}>추가</button>
                            <div>캐스트를 추가해 주세요</div>
                            <div className={"add-cast-btn"} onClick={handleOnClickAddCastBtn}></div>
                            <form className={"add-cast-form"}>
                                {addCastForm.map((cf) =>
                                    <div key={cf}>
                                        <input type={"file"}/>
                                        <label htmlFor={"character"}>배역</label>
                                        <select name={"character"}>
                                            <option>배역을 선택해 주세요</option>
                                            {roles && roles.map((r) =>
                                                <option key={r.id}>{r.name}</option>
                                            )}
                                        </select>
                                        <label htmlFor={"actor"}>배우</label>
                                        <select name={"actor"}>
                                            <option>배우를 선택해 주세요</option>
                                            <option>소정화</option>
                                            <option>문성일</option>
                                            <option>이규형</option>
                                        </select>
                                        <button onClick={deleteForm} value={cf}>삭제</button>
                                    </div>
                                )}
                            </form>

                            <button type={"submit"} className={"button"}>저장</button>
                        </div>
                    </div>
                    <Menu current={"cast"} id={performanceID}/>
                </div>
            </div>
        </DetailWrapper>
    </>
}

export default CastPage