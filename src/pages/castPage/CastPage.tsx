import {useNavigate, useParams} from "react-router-dom";
import {DetailWrapper} from "../performanceDetailPage/PerformanceDetailPage.style";
import React, {useState} from "react";
import Menu from "../../components/Menu/Menu";
import {useForm} from "react-hook-form";
import {Cast} from "../../models/cast";


function CastPage() {
    const {id} = useParams()
    const [newRole, setNewRole] = useState("")
    const [roles, setRoles] = useState([{
        name: "히카루"
    }])
    const [addCastForm, setAddCastForm] = useState<number[]>([])
    const { register, handleSubmit } = useForm<Cast[]>()

    function addRole() {
        roles.push({name: newRole})
        setNewRole("")
    }

    function handleOnClickAddCastBtn() {
        if (addCastForm.length === 0) {
            setAddCastForm([0])
        } else {
            setAddCastForm([...addCastForm, (addCastForm[addCastForm.length - 1] + 1)])
        }
        console.log(addCastForm)
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
                            <div>{ roles && roles.map((r) => r.name)}</div>
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
                                        { roles && roles.map((r) =>
                                            <option>{r.name}</option>
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
                    <Menu current={"cast"} id={id}/>
                </div>
            </div>
        </DetailWrapper>
    </>
}

export default CastPage