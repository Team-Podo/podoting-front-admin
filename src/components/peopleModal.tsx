import React, {useEffect, useState} from "react";
import {editPeople, getPeople} from "../apis/people";
import {People} from "../models/people";
import {useForm} from "react-hook-form";
import useAlarm from "../hooks/useAlarm";

function PeopleModal({id}: { id: string }) {
    const [people, setPeople] = useState<People>()
    const [profileUrl, setProfileUrl] = useState<any>("")
    const [profileFile, setProfileFile] = useState<File>()
    const {register, handleSubmit, reset} = useForm<People>()
    const setAlarm = useAlarm()

    useEffect(() => {
        getPeople({id}).then((res) => {
            setPeople(res.data)
            setProfileUrl(res.data.profileImage)
            reset(people)
        })
    }, [id])

    function previewImg(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.currentTarget.files) {
            const reader = new FileReader()
            const file = e.currentTarget.files[0]

            reader.onload = () => {
                setProfileUrl(reader.result);
            };

            if (file) {
                setProfileFile(file)
                reader.readAsDataURL(file);
            }
        }
    }

    const onSubmit = handleSubmit(async data => {
        const res = await editPeople(data)
        if (res.status === 200) {
            setAlarm("수정되었습니다")
        }
    })

    return <>
        <div className={"modal-container"}>
            <form className={"modal flex-row"} onSubmit={onSubmit}>
                <div className={"profile-preview"}>
                    <img alt={"profile"} src={profileUrl}/>
                </div>
                <div>
                    <input type={"hidden"} {...register("id")} defaultValue={people?.id}/>
                    <div className={"form-column"}>
                        <span>이름</span>
                        <input type={"text"} placeholder={"이름을 입력해 주세요"} autoComplete={"off"} {...register("name")}
                               defaultValue={people?.name}/>
                    </div>
                    <div className={"form-column"}>
                        <span>생년월일</span>
                        <input type={"date"} placeholder={"생년월일을 입력해 주세요"} autoComplete={"off"} {...register("birth")}
                               defaultValue={people?.birth}/>
                    </div>
                    <div className={"form-column"}>
                        <input type={"file"} onChange={previewImg}/>
                    </div>
                    <button className={"button"}>저장</button>
                </div>
            </form>
        </div>
    </>
}

export default PeopleModal