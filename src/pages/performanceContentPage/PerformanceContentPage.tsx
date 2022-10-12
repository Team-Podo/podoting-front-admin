
import React from "react";
import {DetailWrapper} from "../performanceDetailPage/PerformanceDetailPage.style";
import {useParams} from "react-router-dom";
import '@toast-ui/editor/dist/toastui-editor.css';
import WysiwygEditor from "../../components/editor/editor";

function PerformanceContentPage() {
    const { performanceID } = useParams()

    return <>
        <DetailWrapper>
            <div className="common-section">
                <div className="wrapper">
                    <div className="info-left">
                        <WysiwygEditor performanceID={performanceID!}/>
                    </div>
                </div>
            </div>
        </DetailWrapper>

    </>
}

export default PerformanceContentPage