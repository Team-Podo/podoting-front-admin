import {useNavigate, useParams} from "react-router-dom";
import {PlaceDetailPageStyle} from "./PlaceDetailPage.style";
import React, {useEffect, useState} from "react";
import {Area, getAreas} from "../../apis/areas";

function PlaceDetailPage() {
    const {id} = useParams()
    const navigate = useNavigate()
    const [ areas, setAreas ] = useState<Area[]>([])

    useEffect(() => {
        if(id){
            getAreas(id).then((res) => {
                setAreas(res.data)
            })
        }
    }, [id])


    return <PlaceDetailPageStyle>
        <div className={"common-section"}>
            <div className={"place-detail-wrapper"}>
                {
                    areas && areas.map((a) =>
                        <div className={"place-detail"} onClick={() => navigate(`${a.id}`)} key={a.id}>
                            <div>
                                <p>{a.id}</p>
                                <h5>{a.name}</h5>
                            </div>
                            <div className={"place-image"}>
                                <img style={{width: "100%"}} alt={"area"} src={a.backgroundImageUrl}/>
                            </div>
                        </div>)
                }

                <div className={"place-detail"}>
                    <div className={"add-cast-btn"} onClick={() => navigate(`/place/areas/${id}/create`)}></div>
                </div>
            </div>
            <button className={"button"}>저장</button>
        </div>
    </PlaceDetailPageStyle>
}

export default PlaceDetailPage