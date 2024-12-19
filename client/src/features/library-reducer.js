
const initialState = ({
    theme: false
})

const LibraryReducer = (state = initialState, action) => {
    switch (action.type) {
        case "theme":
            
            return {
                ...state, theme: !state.theme
            }
        default:
            return state
    }
}
export default LibraryReducer