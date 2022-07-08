import './Input.css';

function SelectInput(props) {
    return (
        <select required className="Input" value = {props.value} onChange={props.onChange}>
            {props.values.map((value) => {
                return <option key = {value} value={value}>{value}</option>
            })}
        </select>
    );
}
export default SelectInput;