import {PageNotFoundStyle} from "./PageNotFoundStyle";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import useAlarm from "../../hooks/useAlarm";

function PageNotFound() {
    const navigate = useNavigate()
    const setAlarm = useAlarm()

    useEffect(() => {
        setAlarm("잘못된 접근입니다")
        navigate("/performances")
    }, [])
    return <PageNotFoundStyle>

    </PageNotFoundStyle>
}

export default PageNotFound