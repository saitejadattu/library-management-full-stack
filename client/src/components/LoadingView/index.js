import ClipLoader from "react-spinners/ClipLoader"
import "./index.css"
const LoadingView = ({ loading, theme }) => {
    return (
        <div className={`loading ${theme ? "bg-l-dark" : "bg-white"}`}>
            <ClipLoader
                color={`${theme ? "white" : "black"}`}
                loading={loading}
                size={150}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    )
}
export default LoadingView