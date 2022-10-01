const SHOW = 'alarm/SHOW' as const

export const show = (content:string, display:boolean) => ({
    type: SHOW,
    payload: {
        content: content,
        display: display
    }
})

type AlarmAction =
    | ReturnType<typeof show>

type AlarmState = {
    content: string,
    display: boolean
}

const initialState: AlarmState = {
    content: "initial content",
    display: false
}


function alarm(
    state: AlarmState = initialState,
    action: AlarmAction
) {
    switch (action.type) {
        case SHOW:
            return { content: action.payload.content, display: action.payload.display }
        default:
            return { content: state.content, display: false }
    }

}

export default alarm