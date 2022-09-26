import {useNavigate, useParams} from "react-router-dom";
import {PlaceDetailPageStyle} from "./PlaceDetailPage.style";
import React from "react";

interface PageType {
    type: "create" | "edit"
}

function PlaceDetailPage({type}: PageType) {
    const {id} = useParams()
    const navigate = useNavigate()

    return <PlaceDetailPageStyle>
        <div className={"common-section"}>
            <div className={"place-detail-wrapper"}>
                <div className={"place-detail"} onClick={() => navigate("/place/seats/1")}>
                    <div>
                        <p>1</p>
                        <h5>A구역</h5>
                    </div>
                    <div className={"place-image"}>
                        이미지 넣는곳
                    </div>
                </div>
                <div className={"place-detail"}>
                    <div>
                        <p>2</p>
                        <h5>C구역</h5>
                    </div>
                    <div className={"place-image"}>
                        이미지 넣는곳
                    </div>
                </div>
                <div className={"place-detail"}>
                    <div>
                        <p>3</p>
                        <h5>R구역</h5>
                    </div>
                    <div className={"place-image"}>
                        이미지 넣는곳
                    </div>
                </div>
                <div className={"place-detail"}>
                    <div>
                        <p>4</p>
                        <h5>Q구역</h5>
                    </div>
                    <div className={"place-image"}>
                        이미지 넣는곳
                    </div>
                </div>

                <div className={"place-detail"}>
                    <div className={"add-cast-btn"}></div>
                </div>
            </div>
            <button className={"button"}>{type === "create" ? "생성" : "저장"}</button>
        </div>
    </PlaceDetailPageStyle>
}

export default PlaceDetailPage