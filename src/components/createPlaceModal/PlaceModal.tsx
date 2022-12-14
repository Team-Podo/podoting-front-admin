import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {createPlace, editPlace, getPlace} from "../../apis/places";
import useAlarm from "../../hooks/useAlarm";

interface PlaceFormProps {
    id: number
    name: string
    address: string
}

interface PlaceModalProps {
    id? : number
    handleClose: (val: boolean) => void
    type: string
}

function PlaceModal({handleClose, type, id}:PlaceModalProps) {
    const {register, handleSubmit, reset} = useForm<PlaceFormProps>()
    const [data, setData] = useState<PlaceFormProps>()
    const setAlarm = useAlarm()

    const onSubmit = handleSubmit(async data => {
        let res;
        try {
            switch (type) {
                case "create":
                    res = await createPlace(data)
                    console.log(res)
                    res && res.status === 201 ? setAlarm("장소가 생성되었습니다.") : setAlarm("장소 생성 도중 오류가 발생하였습니다.")
                    break;
                case "edit":
                    res = await editPlace(data)
                    console.log(res)
                    res && res.status === 200 ? setAlarm("장소가 수정되었습니다.") : setAlarm("장소 수정 도중 오류가 발생하였습니다.")
                    break;
            }


        } catch (e) {
            console.log(e)
        }
    })

    useEffect(function () {
        if (type === "edit" && id) {
            getPlace(id).then((res) => { setData(res); reset(res) })
        }
    }, [id])

    function closePortal(e: React.MouseEvent) {
        handleClose(false)
    }

    return (
        <div className={"modal-container"}>
            <form className={"modal"} onSubmit={onSubmit}>
                <input type={"hidden"} {...register("id")} defaultValue={data?.id}/>
                <div className={"form-column"}>
                    <span>장소명</span>
                    <input type={"text"} placeholder={"장소명을 입력해 주세요"} autoComplete={"off"} defaultValue={data?.name} {...register("name")} required={true}/>
                </div>
                <div className={"form-column"}>
                    <span>주소</span>
                    <input type={"text"} placeholder={"주소를 입력해 주세요"} autoComplete={"off"} {...register("address")} defaultValue={data?.address}/>
                </div>
                <button className={"button"} type={"submit"}>{type==="edit" ? "수정" : "생성"}</button>
                <div className={"modal-close"} onClick={closePortal}>X</div>
            </form>
        </div>
    )
}

export default PlaceModal