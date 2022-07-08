import { useEffect, useState } from "react";
import store from "../../Store/store";
import * as thunkCreators from "../../Store/thunkCreators";
import DateInput from "../CommonElements/DateInput";
import NumberInput from "../CommonElements/NumberInput";
import SelectInput from "../CommonElements/SelectInput";
import SmallButton from "../CommonElements/SmallButton";
import TextInput from "../CommonElements/TextInput";

const toLocalShortISOTime = (date) => {
    var tzoffset = (new Date()).getTimezoneOffset() * 60000;
    return (new Date(date - tzoffset)).toISOString().slice(0, -1).slice(0, 16);
}


function CreateNewElementPanel(props) {
    const [storeKeepers, setStoreKeepers] = useState([]);
    const [nomenclatureCode, setNomenclatureCode] = useState("");
    const [name, setName] = useState("");
    const [count, setCount] = useState(0);
    const [storeKeeper, setStoreKeeper] = useState();
    const [creationDate, setCreationDate] = useState(toLocalShortISOTime(new Date()));
    useEffect(() => {
        store.dispatch(thunkCreators.GetManyStoreKeepersThunkСreator(0, 1000)).then((result) => {
            setStoreKeepers(result.data.elements);
            setStoreKeeper(result.data.elements[0].fullName + 
                " (" + result.data.elements[0].storeKeeperId + ")");
        });
    }, [])

    return (<>
        <SmallButton text="Создать" onClick = {onClickCreateNewElement}/>
        <form onSubmit={AddDetail(nomenclatureCode, name, count, 
            storeKeeper && storeKeeper.split("(")[1].split(")")[0], 
            new Date(creationDate).toISOString(), 
            props.details, props.setDetails)} className="CreationForm">
            <div className="AddEnterLine">
                <div className="dCreationNomCode CreationFormLineElement">
                    <b className = "CreationFormText">Номен. код</b>
                    <TextInput value={nomenclatureCode} onChange={event => setNomenclatureCode(event.target.value)}
                        minLength={1} maxLength={20} />
                </div>
                <div className="dCreationName CreationFormLineElement">
                    <b className = "CreationFormText">Название</b>
                    <TextInput value={name} onChange={event => setName(event.target.value)} minLength={1} maxLength={20} />
                </div>
                <div className="dCreationStoreKeeper CreationFormLineElement">
                    <b className = "CreationFormText">Кладовщик</b>
                    <SelectInput value={storeKeeper} onChange={event => setStoreKeeper(event.target.value)}
                        values={storeKeepers.map(sK => sK.fullName + " (" + sK.storeKeeperId + ")")} />
                </div>
                <div className="dCreationCount CreationFormLineElement">
                    <b className = "CreationFormText">Количество</b>
                    <NumberInput value={count} onChange={event => setCount(event.target.value)} min={0} max={1000000} />
                </div>
                <div className="dCreationCreationDate CreationFormLineElement">
                    <b className = "CreationFormText">Дата создания</b>
                    <DateInput value={creationDate} onChange={event => setCreationDate(event.target.value)} max={toLocalShortISOTime(new Date())} />
                </div>
            </div>
            <div className="BottomButtons">
                <SmallButton type="submit" text="Создать" />
                <SmallButton text="Свернуть" onClick = {onWrapCreationForm}/>
            </div>
        </form>
    </>
    );
}

function onClickCreateNewElement(){
    document.getElementsByClassName("SmallButton")[0].style.display = "none";
    document.getElementsByClassName("CreationForm")[0].style.display = "block"; 
}

function onWrapCreationForm(){
    document.getElementsByClassName("SmallButton")[0].style.display = "block";
    document.getElementsByClassName("CreationForm")[0].style.display = "none"; 
}

function AddDetail(nomenclatureCode, name, count, storeKeeperId, creationDate, details, setDetails) {
    return (event) => {
        event.preventDefault();
        store.dispatch(thunkCreators.AddDetailThunkСreator(nomenclatureCode, name, count, storeKeeperId, creationDate)).then((result) => {
            store.dispatch(thunkCreators.GetDetailThunkСreator(result.data.id)).then((result) => {
                let newArray = [{...result.data, isCreated: true}, ...details];
                let newArrayWithoutRepeating = [...new Set(newArray.map(detail => detail.detailId))];
                for(let step = 0; step < newArray.length; step++){
                    if(newArray[step].detailId !== newArrayWithoutRepeating[step]) {
                        newArray.splice(step, 1);
                        step--
                    }
                };
                setDetails(newArray);
            });
        });
    }
}

export default CreateNewElementPanel;