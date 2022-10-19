import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {DetailWrapper} from "./PerformanceDetailPage.style";
import {getDetail, PerformanceDetail} from "../../apis/detail";
import Menu from "../../components/menu/Menu";
import {DateRange} from "react-date-range"
import emptyImg from "../../assets/emptyImg.webp"
import {ko} from 'date-fns/esm/locale';
import {addDays} from "date-fns";
import moment from "moment";
import {useForm} from "react-hook-form";
import {createPerformance, deletePerformance, updatePerformance, uploadFiles} from "../../apis/performances";
import {getPlaces} from "../../apis/places";
import useAlarm from "../../hooks/useAlarm";
import {useConfirm} from "../../hooks/useConfirm";

interface PerformanceDetailType {
    type: "create" | "edit"
}


interface PerformanceFormData {
    id: string
    title: string
    placeID: number
    runningTime: string
    rating: string
    startDate: string
    endDate: string
}

interface PlaceList {
    id: number
    name: string
}

function PerformanceDetailPage({type}: PerformanceDetailType) {
    const {id} = useParams()
    const [detail, setDetail] = useState<PerformanceDetail>()
    const [thumbUrl, setThumbUrl] = useState<any>()
    const [places, setPlaces] = useState<PlaceList[]>([])
    const setAlarm = useAlarm()
    const setConfirm = useConfirm()
    const [thumbFile, setThumbFile] = useState<File>()
    const {register, handleSubmit} = useForm<PerformanceFormData>()
    const navigate = useNavigate()
    const [state, setState] = useState<any>([
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 1),
            key: "selection",
        },
    ])

    useEffect(function () {
        getPlaces().then((res) => {
            const getPlaceList = res.map((r) => ({
                id: r.id,
                name: r.name
            }))
            setPlaces(getPlaceList)
        })
        if (type === "edit" && id) {
            getDetail({id}).then((res) => {
                setDetail(res)
                setThumbUrl(res.thumbUrl)
                setState([{
                    startDate: moment().set({
                        year: Number(res.startDate.split("-")[0]),
                        month: Number(res.startDate.split("-")[1]) -1,
                        date: Number(res.startDate.split("-")[2]),
                    }).toDate(),
                    endDate: moment().set({
                        year: Number(res.endDate.split("-")[0]),
                        month: Number(res.endDate.split("-")[1]) -1,
                        date: Number(res.endDate.split("-")[2]),
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
            formData.append("thumbnailImage", thumbFile)
        }
        if (data.placeID == 0) {
                setAlarm("장소를 입력해 주세요")
        }
        data.startDate = moment(state[0].startDate).format("YYYY-MM-DD")
        data.endDate = moment(state[0].endDate).format("YYYY-MM-DD")

        try {
            switch (type) {
                case "create":
                    const performanceId = await createPerformance(data)
                    if(performanceId){
                        if(thumbFile) await uploadFiles({performanceId, formData})
                        setAlarm("생성되었습니다.")
                    }
                    break;
                case "edit":
                    if (id) {
                        data.id = id
                        const res = await updatePerformance(data)
                        //await uploadFiles({performanceId: Number(id), formData})
                        if (res.status === 200) {
                            setAlarm("수정되었습니다.")
                        } else {
                            setAlarm("수정에 실패하였습니다!")
                        }
                    }
                    break;
            }
        } catch (e) {
            console.log(e)
        }
    })

    function onClickDeletePerformance(e:React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault()
        setConfirm("정말로 삭제하시겠습니까?", () => {
            id && deletePerformance({performanceID: id}).then((res) => {
                if(res===200) {
                    setAlarm("삭제되었습니다")
                    navigate("/performances")
                }
            })
        })
    }

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
                                <input type={"text"} id="title" {...register("title")} defaultValue={detail?.title} required={true}
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
                                    <select {...register("placeID", {required: true})} defaultValue={detail?.place.id}>
                                        <option value={0}>장소를 선택해 주세요</option>
                                        { places && places.map((p) => <option key={p.id} value={p.id}>{p.name}</option>) }
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
                            { type === "edit" &&
                                <button className={"button"}
                                        onClick={onClickDeletePerformance}>삭제</button>
                            }
                        </form>

                    </div>
                    <Menu current={"info"} performanceID={id!}/>
                </div>
                : <></>
            }
        </div>
    </DetailWrapper>
}

export default PerformanceDetailPage