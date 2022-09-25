import React, {useEffect, useMemo, useState} from "react";
import {useParams} from "react-router-dom";
import {DetailWrapper} from "./PerformanceDetailPage.style";
import {getDetail} from "../../apis/detail";
import Menu from "../../components/Menu/Menu";
import {DateRange} from "react-date-range"
import emptyImg from "../../assets/emptyImg.webp"
import {ko} from 'date-fns/esm/locale';
import {addDays} from "date-fns";
import moment from "moment";
import {useForm} from "react-hook-form";
import {createPerformance, updatePerformance, uploadFiles} from "../../apis/performances";

interface PerformanceDetailType {
    type: "create" | "edit"
}

interface PerformanceFormData {
    id: string
    title: string
    thumbUrl: string
    place: number
    runningTime: string
    rating: string
    startDate: string
    endDate: string
}

function PerformanceDetailPage({type}: PerformanceDetailType) {
    const {id} = useParams()
    const [detail, setDetail] = useState<PerformanceFormData>()
    const [thumbUrl, setThumbUrl] = useState<any>()
    const [thumbFile, setThumbFile] = useState<File>()
    const {register, handleSubmit} = useForm<PerformanceFormData>()
    const [state, setState] = useState<any>([
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 1),
            key: "selection",
        },
    ])

    useEffect(function () {
        if (type === "edit" && id) {
            getDetail({id}).then((res) => {
                setDetail(res)
                setThumbUrl(res.thumbUrl)
                setState([{
                    startDate: moment().set({
                        year: Number(res.startDate.split(".")[0]),
                        month: Number(res.startDate.split(".")[1]),
                        date: Number(res.startDate.split(".")[2]),
                    }).toDate(),
                    endDate: moment().set({
                        year: Number(res.endDate.split(".")[0]),
                        month: Number(res.endDate.split(".")[1]),
                        date: Number(res.endDate.split(".")[2]),
                    }).toDate(),
                    key: "selection",
                }])
            })
        }
    }, [id, type])

    function previewPoster(e: React.ChangeEvent<HTMLInputElement>) {
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
            formData.append("thumbImg", thumbFile)
        }
        if (data.place == 0) {
            alert("장소를 입력해 주세요.")
        }
        data.startDate = moment(state[0].startDate).format("YYYY-MM-DD")
        data.endDate = moment(state[0].endDate).format("YYYY-MM-DD")

        try {
            switch (type) {
                case "create":
                    const performanceId = await createPerformance(data)
                    await uploadFiles({performanceId, formData})
                    break;
                case "edit":
                    if (id) {
                        data.id = id
                        await updatePerformance(data)
                        await uploadFiles({performanceId: Number(id), formData})
                    }
                    break;
            }
        } catch (e) {
            console.log(e)
        }
    })

    return <DetailWrapper>
        <div className="info common-section">
            { detail || type === "create" ?
                <div className="wrapper">
                    <div className="info-left">
                        <div className="poster-container">
                            <img src={thumbUrl ? thumbUrl : emptyImg} alt="poster_image"/>
                        </div>
                        <form className="info-left-detail-box" onSubmit={onSubmit}>
                            <input type={"file"} onChange={previewPoster}/>
                            <div className="info-left-detail">
                                <input type={"text"} id="title" {...register("title")} defaultValue={detail?.title}
                                       placeholder={"제목을 입력해 주세요"}/>
                            </div>
                            <div className="info-left-detail">
                                <span>공연 일자</span>
                                <div>
                                    <span>{`${moment(state[0].startDate).format("YYYY-MM-DD")} ~ ${moment(state[0].endDate).format("YYYY-MM-DD")}`}</span>
                                    <input type={"hidden"}
                                           value={[moment(state[0].startDate).format("YYYY-MM-DD"), moment(state[0].endDate).format("YYYY-MM-DD")]}
                                           readOnly={true}/>
                                    <DateRange
                                        onChange={(item) => setState([item.selection])}
                                        moveRangeOnFirstSelection={false}
                                        ranges={state}
                                        locale={ko}/>
                                </div>
                            </div>
                            <div className="info-left-detail">
                                <span>장소</span>
                                <div>
                                    <select {...register("place", {required: true})}>
                                        <option value={0}>장소를 선택해 주세요</option>
                                        <option value={27}>고양어울림누리 어울림극장</option>
                                    </select>
                                </div>
                            </div>
                            <div className="info-left-detail">
                                <span>관람시간</span>
                                <div><input type={"text"} placeholder={"000 분"} autoComplete={"off"}
                                            defaultValue={detail?.runningTime}
                                            {...register("runningTime")}/></div>
                            </div>
                            <div className="info-left-detail">
                                <span>관람등급</span>
                                <div><input type={"text"} placeholder={"12세 이상"} autoComplete={"off"}
                                            defaultValue={detail?.rating}
                                            {...register('rating')}/></div>
                            </div>
                            <button className={"button"} type={"submit"}>{type === "create" ? "생성" : "수정"}</button>
                        </form>

                    </div>
                    <Menu current={"info"} id={id}/>
                </div>
                : <></>
            }
        </div>
    </DetailWrapper>
}

export default PerformanceDetailPage