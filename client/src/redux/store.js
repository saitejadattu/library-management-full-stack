import { configureStore } from "@reduxjs/toolkit"
import LibraryReducer from "../features/library-reducer"
const store = configureStore({
    reducer: LibraryReducer
})
export default store