
import React from "react";
import {DetailWrapper} from "../performanceDetailPage/PerformanceDetailPage.style";
import {useParams} from "react-router-dom";
import '@toast-ui/editor/dist/toastui-editor.css';
import WysiwygEditor from "../../components/editor/editor";
import Menu from "../../components/Menu/Menu";

function PerformanceContentPage() {
    const { performanceID } = useParams()

    return <>
        <DetailWrapper>
            <div className="info common-section">
                <div className="wrapper">
                    <div className="info-left">
                        <WysiwygEditor performanceID={performanceID!}/>
                    </div>
                    <Menu current={"content"} performanceID={performanceID!}/>
                </div>
            </div>
        </DetailWrapper>

    </>
}

export default PerformanceContentPage