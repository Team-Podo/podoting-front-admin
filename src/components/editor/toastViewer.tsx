// Toast-UI Viewer 임포트
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { Viewer } from '@toast-ui/react-editor';

export default function ToastViewer() {
    // 마크다운
    const markdown = '## 마크다운 헤더';

    return (
        <div>
            <Viewer initialValue={markdown} />
        </div>
    );
}