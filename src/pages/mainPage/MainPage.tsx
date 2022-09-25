import {MainPageStyle} from "./MainPage.style";
import React, {useState} from "react";

function MainPage() {
    const [id, setId] = useState("")
    const [password, setPassword] = useState("")

    function handleIdChange(e: React.ChangeEvent<HTMLInputElement>) {
        setId(e.target.value)
    }

    function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
        setPassword(e.target.value)
    }

    function handleLoginForm(e: React.FormEvent) {
        e.preventDefault()
        window.location.href = "/performances"
    }

    return <MainPageStyle>
        <div className="login-box">
            <form name="login-form" onSubmit={handleLoginForm}>
                <div className={"input-wrapper"}>
                    <label>ID</label>
                    <input type={"text"} name={"id"} onChange={handleIdChange} value={id} autoComplete={"off"} required/>
                </div>
                <div className={"input-wrapper"}>
                    <label>Password</label>
                    <input type={"text"} name={"password"} onChange={handlePasswordChange} value={password} autoComplete={"off"} required/>
                </div>
                <button type={"submit"} className={"button"}>제출</button>
            </form>
        </div>
    </MainPageStyle>
}

export default MainPage