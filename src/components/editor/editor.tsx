import '@toast-ui/editor/dist/toastui-editor.css'
import '@toast-ui/editor/dist/theme/toastui-editor-dark.css'
import {Editor} from '@toast-ui/react-editor'
import {useEffect, useRef, useState} from 'react'
import {editContent, getContent, saveContent, uploadImage} from "../../apis/content";

const WysiwygEditor = ({performanceID}: { performanceID: string }) => {
    const [content, setContent] = useState("")
    const [mounted, setMounted] = useState(false)
    const [type, setType] = useState<"new"|"edit">()
    const [contentID, setContentID] = useState<string>()
    const editorRef = useRef<Editor>(null);
    const toolbarItems = [['heading', 'bold', 'italic', 'strike'], ['hr'], ['table', 'link'], ['image'], ['scrollSync'],]

    useEffect(() => {
        refreshContent()
    }, [performanceID])

    function refreshContent() {
        getContent({performanceID}).then((res) => {
            if (res.data.contents.length < 1) {
                setType("new")
            } else {
                setType("edit");
                setContentID(res.data.contents[0].id)
                setContent(res.data.contents[0].content)
            }
        }).then(() => setMounted(true))
    }

    function onClickSaveContent() {
        if (editorRef.current) {
            const content = editorRef.current.getInstance().getMarkdown()
            const managingTitle = "컨텐츠"

            if(type === "new") {
                performanceID && saveContent({performanceID, content, managingTitle})
            } else if(type === "edit" && contentID) {
                performanceID && editContent({performanceID, contentID, content, managingTitle})
            }
        }
    }

    return (
        <>
            { mounted && <>
                <Editor ref={editorRef}
                        initialValue={content} // 글 수정 시 사용
                        initialEditType='markdown'
                        hideModeSwitch={true}
                        height='500px'
                        usageStatistics={false}
                        hooks={{
                            addImageBlobHook: async (blob, callback) => {
                                const formData = new FormData();
                                if(blob) {
                                    formData.append('contentImage', blob)
                                }

                                try {
                                    await uploadImage({performanceID, contentImage: formData}).then((res) => {
                                        if(res.status === 201) {
                                            callback(res.data.url, '컨텐츠 이미지');
                                        }
                                    })
                                } catch (e) {
                                    console.log(e)
                                }

                            }
                        }}
                        toolbarItems={toolbarItems}/>
                <button className={"button"} onClick={onClickSaveContent}>저장</button>
            </>}
        </>
    )

}
export default WysiwygEditor