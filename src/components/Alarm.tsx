import ModalPortal from "./ModalPortal";
import AlertModal from "./alertModal/AlertModal";

interface AlarmProps {
    content: string,
    display: boolean
}

function Alarm({content, display} : AlarmProps) {
    return <ModalPortal>
            <AlertModal display={display} message={content}/>
        </ModalPortal>
}

export default Alarm