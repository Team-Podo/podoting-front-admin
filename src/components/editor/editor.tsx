// WysiwygEditor.js

import '@toast-ui/editor/dist/toastui-editor.css'
import '@toast-ui/editor/dist/theme/toastui-editor-dark.css'
import { Editor } from '@toast-ui/react-editor'
import { useRef } from 'react'

const WysiwygEditor = () => {
    const editorRef = useRef<Editor>(null);
    const toolbarItems = [ ['heading', 'bold', 'italic', 'strike'], ['hr'], ['ul', 'ol', 'task'], ['table', 'link'], ['image'], ['code'], ['scrollSync'], ]

    function onClickSaveHTML() {
        if(editorRef.current) {
            const content = editorRef.current.getInstance().getHTML()
            const content2 = editorRef.current.getInstance().getMarkdown()
            console.log(content)
            console.log(content2)
        }
    }

    return(
        <>
            <Editor ref={editorRef}
                    initialValue='' // 글 수정 시 사용
                    initialEditType='markdown' // wysiwyg & markdown
                    hideModeSwitch={true}
                    height='500px'
                    theme={''} // '' & 'dark'
                    usageStatistics={false}
                    toolbarItems={toolbarItems}/>
            <button className={"button"} onClick={onClickSaveHTML}>저장</button>
        </>
    )

}
export default WysiwygEditor