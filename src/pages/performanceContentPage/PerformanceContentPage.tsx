
import React from "react";
import {DetailWrapper} from "../performanceDetailPage/PerformanceDetailPage.style";
import {useParams} from "react-router-dom";
import {Editor} from "@toast-ui/react-editor";
import '@toast-ui/editor/dist/toastui-editor.css';
import WysiwygEditor from "../../components/editor/editor";

function PerformanceContentPage() {
    const { id } = useParams()

    function onClickSaveHTML() {
        const html = Editor.prototype.getInstance().getHTML()
        console.log(html)
    }

    return <>
        <DetailWrapper>
            <div className="common-section">
                <div className="wrapper">
                    <div className="info-left">
                        <WysiwygEditor/>
                    </div>
                </div>
                <button className={"button"} onClick={onClickSaveHTML}>저장</button>
            </div>
        </DetailWrapper>

    </>
}

export default PerformanceContentPage