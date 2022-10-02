import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Area, createArea, deleteArea, editArea, getArea, uploadAreaImage} from "../../apis/areas";
import {useForm} from "react-hook-form";
import {AreaPageStyle} from "./AreaPage.style";
import useAlarm from "../../hooks/useAlarm";

interface AreaPageType {
    type: "new" | "edit"
}

interface AreaFormProps {
    placeId: number
    areaId: number
    name: string
}

function AreaPage({type}: AreaPageType) {
    const {placeId, areaId} = useParams()
    const [area, setArea] = useState<Area>()
    const [thumbUrl, setThumbUrl] = useState<any>("")
    const [thumbFile, setThumbFile] = useState<File>()
    const {register, handleSubmit, reset } = useForm<AreaFormProps>()
    const setAlarm = useAlarm()
    const navigate = useNavigate()

    useEffect(() => {
        if (placeId && areaId && type === "edit") {
            getArea(placeId, areaId).then((res) => {
                if (res.status === 404) {
                    console.log("구역이 없습니다")
                } else if (res.status === 200) {
                    setArea(res.data)
                    setThumbUrl(res.data.backgroundImageUrl)
                    reset(res.data)
                }
            })
        }
    }, [areaId])

    function previewImg(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.currentTarget.files) {
            const reader = new FileReader()
            const file = e.currentTarget.files[0]

            reader.onload = () => {
                setThumbUrl(reader.result);
            };

            if (file) {
                setThumbFile(file)
                reader.readAsDataURL(file);
            }
        }
    }

    const onSubmit = handleSubmit(async data => {
            const formData = new FormData();
            if (thumbFile) {
                formData.append("backgroundImage", thumbFile)
            }

            data.placeId = Number(placeId)

            try {
                let res: any
                switch (type) {
                    case "new":
                        res = await createArea(data)
                        break
                    case "edit":
                        data.areaId = Number(areaId)
                        res = await editArea(data)
                        break
                }
                if (res.status === (200 || 201)) {
                    const areaId = res.data
                    if (thumbFile && placeId) {
                        await uploadAreaImage({placeId, areaId, formData})
                    }
                    setAlarm(type==="new" ? "구역이 추가되었습니다" : "구역이 수정되었습니다")
                }

            } catch (e) {
                console.log(e)
            }
        }
    )

    async function deleteAreaHandler(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault()
        if(placeId && areaId ) await deleteArea({ placeId, areaId }).then((res) => {
            if (res === 200) {
                setAlarm("구역이 삭제되었습니다")
                navigate(`/place/areas/${placeId}`)
            } else {
                setAlarm("구역 삭제 도중 오류가 발생하였습니다")
            }
        })
    }

    return <>
        <AreaPageStyle>
            <div className={"common-section"}>
                <div className={"img-container"}>
                    <img src={thumbUrl}/>
                </div>
                <form onSubmit={onSubmit}>
                    <div className={"input-wrapper"}>
                        <label>구역명</label>
                        <input type={"text"} defaultValue={area?.name} {...register("name")} required={true}/>
                    </div>
                    <div className={"input-wrapper"}>
                        <label>구역 사진</label>
                        <input type={"file"} onChange={previewImg}/>
                    </div>
                    <button className={"btn-small"} type={"submit"}>{type === "new" ? "생성" : "수정 "}</button>
                    <button className={"btn-small"} onClick={deleteAreaHandler}>삭제</button>
                </form>
            </div>
        </AreaPageStyle>
    </>
}

export default AreaPage