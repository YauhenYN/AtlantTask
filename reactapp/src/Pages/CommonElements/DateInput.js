import './Input.css';

function DateInput(props) {
    return (
        <input required className = "Input" type="datetime-local" value = {props.value} onChange = {props.onChange} min = {props.min} max = {props.max}></input>
    );
}
export default DateInput;