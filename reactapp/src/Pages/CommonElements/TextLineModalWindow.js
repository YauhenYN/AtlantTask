import "./TextLineModalWindow.css";
import BlackBackground from "./BlackBackground";
import SmallButton from "./SmallButton";

function TextLineModalWindow(props) {
    return (
        <BlackBackground body={
            <div className="textLineModalWindow">
                <b className="textLineModalWindowText">{props.text}</b>
                <SmallButton text = "Ок" onClick = {closeTextLineModalWindow(props.onClosing)}/>
            </div>
        } />
    );
}

function closeTextLineModalWindow(onClosing){
    return () => {
        onClosing(true);
    }
}

export default TextLineModalWindow;