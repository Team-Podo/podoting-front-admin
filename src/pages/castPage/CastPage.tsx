import {useNavigate, useParams} from "react-router-dom";
import {DetailWrapper} from "../performanceDetailPage/PerformanceDetailPage.style";
import React, {useEffect, useState} from "react";
import Menu from "../../components/Menu/Menu";
import {useForm} from "react-hook-form";
import {Cast} from "../../models/cast";
import {createCharacter, deleteCharacter, getCharacters} from "../../apis/characters";
import useAlarm from "../../hooks/useAlarm";
import {People} from "../../models/people";
import {getPeoples} from "../../apis/people";


interface Character {
    id: number
    name: string
}

function CastPage() {
    const {performanceID} = useParams()
    const [newRole, setNewRole] = useState("")
    const [characters, setCharacters] = useState<Character[]>([])
    const [people, setPeople] = useState<People[]>([])
    const [casts, setCasts] = useState<Cast[]>([])
    const [addCastForm, setAddCastForm] = useState<number[]>([])
    const setAlarm = useAlarm()
    const {register, handleSubmit} = useForm<Cast[]>()

    useEffect(() => {
        refreshCharacters()
        getPeoples().then((res) => setPeople(res))
    }, [performanceID])

    function refreshCharacters () {
        if (performanceID) {
            getCharacters({performanceID}).then((res) =>
                setCharacters(res.data))
        }
    }

    async function addRole() {
        if (performanceID) {
            const res = await createCharacter({performanceID, "name": newRole})
            setCharacters([...characters, {id: res.data, name: newRole}])
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
                                {characters && characters.map((c) =>
                                    <li key={c.id}>{c.name}<span className={"remove-li"} onClick={() => onClickDeleteCharacter(c.id)}>삭제</span></li>)}
                            </ul>
                            <input type={"text"} value={newRole} onChange={(e) => setNewRole(e.currentTarget.value)}/>
                            <button onClick={addRole}>추가</button>
                            <div>캐스트를 추가해 주세요</div>
                            <div className={"add-cast-btn"} onClick={handleOnClickAddCastBtn}></div>
                            <form className={"add-cast-form"}>
                                {casts && casts.map((cast) =>
                                    <div key={cast.id}>
                                        <input type={"file"}/>
                                        <label htmlFor={"character"}>배역</label>
                                        <select name={"character"} defaultValue={cast.id}>
                                            <option>배역을 선택해 주세요</option>
                                            {characters && characters.map((c) =>
                                                <option key={c.id}>{c.name}</option>
                                            )}
                                        </select>
                                        <label htmlFor={"actor"}>배우</label>
                                        <select name={"actor"}>
                                            <option>배우를 선택해 주세요</option>
                                            { people && people.map((p) =>
                                                <option key={p.id} value={p.id}>{p.name}</option>
                                            )}
                                        </select>
                                        <button onClick={deleteForm} value={cast.id}>삭제</button>
                                    </div>
                                )}
                                {addCastForm.map((cf) =>
                                    <div key={cf}>
                                        <input type={"file"}/>
                                        <label htmlFor={"character"}>배역</label>
                                        <select name={"character"}>
                                            <option>배역을 선택해 주세요</option>
                                            {characters && characters.map((c) =>
                                                <option key={c.id}>{c.name}</option>
                                            )}
                                        </select>
                                        <label htmlFor={"actor"}>배우</label>
                                        <select name={"actor"}>
                                            <option>배우를 선택해 주세요</option>
                                            { people && people.map((p) =>
                                                <option key={p.id} value={p.id}>{p.name}</option>
                                            )}
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