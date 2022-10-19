import {useNavigate, useParams} from "react-router-dom";
import {DetailWrapper} from "../performanceDetailPage/PerformanceDetailPage.style";
import React, {useEffect, useState} from "react";
import Menu from "../../components/menu/Menu";
import {Cast} from "../../models/cast";
import {createCharacter, deleteCharacter, getCharacters} from "../../apis/characters";
import useAlarm from "../../hooks/useAlarm";
import {People} from "../../models/people";
import {getPeoples} from "../../apis/people";
import {deleteCast, getCasts, saveCasts, uploadCastImage} from "../../apis/casts";


interface Character {
    id: number
    name: string
}

interface CastForm extends Cast {
    idx: number
    profileFile?: File
}

function CastPage() {
    const {performanceID} = useParams()
    const [loaded, setLoaded] = useState(false)
    const [newRole, setNewRole] = useState("")
    const [characters, setCharacters] = useState<Character[]>([])
    const [people, setPeople] = useState<People[]>([])
    const [casts, setCasts] = useState<CastForm[]>([])
    const [deletedIDs, setDeletedIDs] = useState<number[]>([])
    const setAlarm = useAlarm()

    useEffect(() => {
        refreshCharacters()
        getPeoples().then((res) => setPeople(res))
        performanceID && getCasts({performanceID}).then((res: CastForm[]) => {
            if (res) {
                res.map((r) => {
                    if (r.id) r["idx"] = r.id
                    return r
                })
            } else {
                res = [{idx: 1, characterID: "0", personID: "0", profileImage: ""}]
            }
            setCasts(res)
        })
        setLoaded(true)
    }, [performanceID])

    function refreshCharacters() {
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
        function emptyCast(idx: number) {
            return {idx: idx, characterID: "0", personID: "0", profileImage: ""}
        }

        setCasts([...casts, emptyCast(casts[casts.length - 1].idx + 1)])
    }

    function formCharacterChange(e: React.ChangeEvent<HTMLSelectElement>) {
        if (e.currentTarget.parentElement) {
            const idx = Number(e.currentTarget.parentElement.getAttribute("data-idx"))
            if (idx) {
                const modify = [...casts].find((c) => c.idx === idx)
                if (modify) {
                    modify.characterID = e.currentTarget.value
                }
            }
        }
    }

    function formPeopleChange(e: React.ChangeEvent<HTMLSelectElement>) {
        if (e.currentTarget.parentElement) {
            const idx = Number(e.currentTarget.parentElement.getAttribute("data-idx"))
            if (idx) {
                const modify = [...casts].find((c) => c.idx === idx)
                if (modify) {
                    modify.personID = e.currentTarget.value
                }
            }
        }
    }

    function previewImg(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.currentTarget.parentElement) {
            const idx = Number(e.currentTarget.parentElement.getAttribute("data-idx"))
            if (idx && e.currentTarget.files) {
                const modify = [...casts].find((c) => c.idx === idx)
                const reader = new FileReader()
                const file = e.currentTarget.files[0]

                if (modify) {
                    reader.onload = () => {
                        modify.profileImage = reader.result
                    };

                    if (file) {
                        modify.profileFile = file
                        reader.readAsDataURL(file);
                    }
                }
            }
        }
    }

    function onClickDeleteCharacter(characterID: number) {
        deleteCharacter({characterID}).then((res) => {
            if (res === 500) {
                setAlarm("캐스트와 매칭되어 있는 배역은 삭제할 수 없습니다.")
            } else {
                refreshCharacters()
            }
        })
    }

    function deleteForm(e: React.FormEvent<HTMLButtonElement>) {
        e.preventDefault()
        const id = Number(e.currentTarget.value)
        if (e.currentTarget.parentElement) {
            const idx = Number(e.currentTarget.parentElement.getAttribute("data-idx"))
            if (id !== 0) setDeletedIDs([...deletedIDs, id])
            setCasts(casts.filter((c) => {
                if (c.idx !== idx) {
                    return c
                }
            }))
        }
    }

    function onSubmit(e: React.FormEvent) {
        e.preventDefault()
        deletedIDs.forEach((dl) => deleteCast({castID: dl}))
        if (performanceID) saveCasts({performanceID, casts}).then((res) => {
            if (res.status === 200) {
                casts.forEach((c) => {
                    const formData = new FormData();
                    if (c.profileFile && c.id) {
                        formData.append("profileImage", c.profileFile)
                        uploadCastImage({castID: c.id, formData})
                    }
                })
            }
            refreshCharacters()
        })
    }

    return <DetailWrapper>
        {loaded ?
        <div className="common-section">
            <div className="wrapper">
                <div className="info-left">
                    <div>
                        <h2>뮤지컬 팬레터</h2>
                        <div>배역을 추가해 주세요</div>
                        <ul>
                            {characters && characters.map((c) =>
                                <li key={c.id}>{c.name}<span className={"remove-li"}
                                                             onClick={() => onClickDeleteCharacter(c.id)}>삭제</span>
                                </li>)}
                        </ul>
                        <input type={"text"} value={newRole} onChange={(e) => setNewRole(e.currentTarget.value)}/>
                        <button onClick={addRole}>추가</button>
                        <div>캐스트를 추가해 주세요</div>
                        <div className={"add-cast-btn"} onClick={handleOnClickAddCastBtn}></div>
                        <form className={"add-cast-form"} onSubmit={onSubmit}>
                            {(casts && casts.length > 0) && casts.map((cast) =>
                                <div key={cast.idx} data-idx={cast.idx}>
                                    <div className={"cast-profile"}>
                                        <img src={cast.profileImage}/>
                                    </div>
                                    <input type={"file"} onChange={previewImg}/>
                                    <label htmlFor={"character"}>배역</label>
                                    <select name={"character"} defaultValue={cast.characterID}
                                            onChange={formCharacterChange}>
                                        <option value={0}>배역을 선택해 주세요</option>
                                        {characters && characters.map((c) =>
                                            <option key={c.id} value={c.id}>{c.name}</option>
                                        )}
                                    </select>
                                    <label htmlFor={"actor"}>배우</label>
                                    <select name={"actor"} defaultValue={cast.personID} onChange={formPeopleChange}>
                                        <option>배우를 선택해 주세요</option>
                                        {people && people.map((p) =>
                                            <option key={p.id} value={p.id}>{p.name}</option>
                                        )}
                                    </select>
                                    <button className={"btn-small"} onClick={deleteForm} value={cast.id}>삭제</button>
                                </div>
                            )}
                        </form>
                        <button type={"submit"} onClick={onSubmit} className={"button"}>저장</button>
                    </div>
                </div>
                <Menu current={"cast"} performanceID={performanceID!}/>
            </div>
        </div> : null }
    </DetailWrapper>
}

export default CastPage