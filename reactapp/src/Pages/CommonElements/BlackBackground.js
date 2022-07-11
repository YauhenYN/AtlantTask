import "./BlackBackground.css";

function BlackBackground(props) {
    props.isLoaded ? document.body.style.overflow = "scroll" : document.body.style.overflow = "hidden"
    return (
        !props.isLoaded && <div className="blackBackground">
            {props.body}
        </div>
    );
}
export default BlackBackground;