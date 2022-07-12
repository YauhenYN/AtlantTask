import "./BlackBackground.css";

function BlackBackground(props) {
    props.isLoaded ? document.body.style.overflow = "auto" : document.body.style.overflow = "hidden"
    return (
        !props.isLoaded && <div className="blackBackground">
            <div className="inBlackBackground">
                {props.body}
            </div>
        </div>
    );
}
export default BlackBackground;