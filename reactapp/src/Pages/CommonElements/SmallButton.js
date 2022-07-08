import "./SmallButton.css";

function SmallButton(props) {
    return (
        <input className = "SmallButton" type = {props.type ? props.type : "button"} onClick = {props.onClick} value = {props.text}/>
    );
}

export default SmallButton;