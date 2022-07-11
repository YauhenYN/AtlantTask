import "./Loading.css";
import BlackBackground from "./BlackBackground";
import loadingIcon from "../../resources/loadingIcon.jpg";

function Loading(props) {
    return (
        <BlackBackground isLoaded = {props.isLoaded} body = {
            <img className = "loadingIcon rotating" src={loadingIcon} alt = "loading"/>
        }/>
    );
}
export default Loading;