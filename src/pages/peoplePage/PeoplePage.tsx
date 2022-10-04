import React, {useEffect, useState} from "react";
import {createPeople, deletePeople, getPeoples} from "../../apis/people";
import {People} from "../../models/people";
import ModalPortal from "../../components/ModalPortal";
import PeopleModal from "../../components/peopleModal";
import useAlarm from "../../hooks/useAlarm";
import {useForm} from "react-hook-form";

function PeoplePage() {
    const [people, setPeople] = useState<People[]>([])
    const [modal, setModal] = useState(false)
    const [selectedPeople, setSelectedPeople] = useState<string>()
    const { register, handleSubmit } = useForm<People>()
    const setAlarm = useAlarm()

    useEffect(() => {
        refreshPeople()
    }, [])

    function refreshPeople() {
        getPeoples().then((res) => {
            setPeople(res)
        })
    }
    function onClickEditPeople(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault()
        setSelectedPeople(e.currentTarget.value)
        setModal(true)
    }

    function onClickDeletePeople(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault()
        deletePeople({id: e.currentTarget.value}).then((res) => {
            setAlarm("삭제되었습니다")
            refreshPeople()
        })
    }

    const onSubmit =  handleSubmit(async data => {
        console.log(data)
        createPeople({name: data.name, birth:data.birth}).then((res) => {
            if(res.status === 201) {
                setAlarm("생성되었습니다")
                refreshPeople()
            }
        })
    })

    return <>
        <div className={"common-section"}>
            <form onSubmit={onSubmit}>
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
                            <th>
                                <button className={"btn-small"} value={p.id} onClick={onClickEditPeople}>수정</button>
                                <button className={"btn-small"} value={p.id} onClick={onClickDeletePeople}>삭제</button>
                            </th>
                        </tr>)}
                    <tr>
                        <td>#</td>
                        <td><input type={"file"}/></td>
                        <td><input type={"text"} {...register("name")} required={true}/></td>
                        <td><input type={"date"} {...register("birth")}/></td>
                        <th>
                            <button className={"btn-small"}>추가</button>
                        </th>
                    </tr>
                    </tbody>
                </table>
            </form>
        </div>

        {(modal && selectedPeople) &&
        <ModalPortal>
            <PeopleModal id={selectedPeople}/>
        </ModalPortal>
        }
    </>
}

export default PeoplePage