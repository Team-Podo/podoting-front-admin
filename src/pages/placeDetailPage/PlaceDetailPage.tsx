import {useNavigate, useParams} from "react-router-dom";
import {PlaceDetailPageStyle} from "./PlaceDetailPage.style";

function PlaceDetailPage() {
    const {id} = useParams()
    const navigate = useNavigate()

    return <PlaceDetailPageStyle>
        <div className={"common-section"}>
            place id: {id}
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
            </div>
        </div>
    </PlaceDetailPageStyle>
}

export default PlaceDetailPage