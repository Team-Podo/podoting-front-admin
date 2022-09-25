import {NavStyle} from "./Nav.style";
import logoSrc from "../../assets/logo.jpg"
import {useNavigate} from "react-router-dom";

function Nav () {
    const navigation = useNavigate();
    if (window.location.pathname === "/") return null

    return <NavStyle className={"content-wrap"}>
            <div className={"nav-left"}>
                <img className={"logo"} src={logoSrc} onClick={() => navigation("/")}/>
                <ul>
                    <li onClick={() => navigation("/performances")}>상품</li>
                    <li onClick={() => navigation("/places")}>장소</li>
                </ul>
            </div>
            <div className={"profile"}>
                <div className={"profile-image"}></div>
            </div>

    </NavStyle>
}

export default Nav