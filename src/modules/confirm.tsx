const ASK = 'confirm/ASK' as const

export const ask = (content:string, display:boolean, next:() => void) => ({
    type: ASK,
    payload: {
        content: content,
        display: display,
        next: next
    }
})

type ConfirmAction =
    | ReturnType<typeof ask>

type ConfirmState = {
    content: string,
    display: boolean
}

const initialState: ConfirmState = {
    content: "initial content",
    display: false,
}


function confirm(
    state: ConfirmState = initialState,
    action: ConfirmAction
) {
    switch (action.type) {
        case ASK:
            return { content: action.payload.content, display: action.payload.display, next:action.payload.next }
        default:
            return { content: state.content, display: false, next:() => {} }
    }

}

export default confirm