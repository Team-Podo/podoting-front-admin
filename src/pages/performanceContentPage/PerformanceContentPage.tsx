import Menu from "../../components/Menu/Menu";
import React from "react";
import {DetailWrapper} from "../performanceDetailPage/PerformanceDetailPage.style";
import {useParams} from "react-router-dom";

function PerformanceContentPage() {
    const { id } = useParams()

    return <>
        <DetailWrapper>
            <div className="common-section">
                <div className="wrapper">
                    <div className="info-left">
                        content
                    </div>
                    <Menu current={"content"} id={id}/>
                </div>
            </div>
        </DetailWrapper>

    </>
}

export default PerformanceContentPage