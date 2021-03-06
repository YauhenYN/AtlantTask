import { useState } from "react";
import store from "../../Store/store";
import * as thunkCreators from "../../Store/thunkCreators";
import SmallButton from "../CommonElements/SmallButton";
import TextInput from "../CommonElements/TextInput";
import TextLineModalWindow from "../CommonElements/TextLineModalWindow";
import { showScroll } from "../commonMethods";

function CreateNewElementPanel(props) {
    const [fullName, setFullName] = useState("");
    const [isCreationFailed, setIsCreationFailed] = useState(false);

    return (<>
        {isCreationFailed && <TextLineModalWindow text="Не удалось создать запись"
            onClosing={() => { setIsCreationFailed(false); showScroll(); }} />}
        <SmallButton text="Создать" onClick={onClickCreateNewElement} />
        <form onSubmit={AddStoreKeeper(fullName, props.storeKeepers, props.setStoreKeepers,
            props.setIsLoaded, setIsCreationFailed)}
            className="StoreKeeperCreationForm CreationForm">
            <div className="AddEnterLine">
                <div className="dCreationName CreationFormLineElement">
                    <b className="CreationFormText">ФИО Кладовщика</b>
                    <TextInput value={fullName} onChange={event => setFullName(event.target.value)} minLength={1} maxLength={50} />
                </div>
            </div>
            <div className="BottomButtons">
                <SmallButton type="submit" text="Создать" />
                <SmallButton text="Свернуть" onClick={onWrapCreationForm} />
            </div>
        </form>
    </>
    );
}

function onClickCreateNewElement() {
    document.getElementsByClassName("SmallButton")[0].style.display = "none";
    document.getElementsByClassName("CreationForm")[0].style.display = "block";
}

function onWrapCreationForm() {
    document.getElementsByClassName("SmallButton")[0].style.display = "block";
    document.getElementsByClassName("CreationForm")[0].style.display = "none";
}

function AddStoreKeeper(fullName, storeKeepers, setStoreKeepers, setIsLoaded, setIsCreationFailed) {
    return (event) => {
        setIsLoaded(false);
        event.preventDefault();
        store.dispatch(thunkCreators.AddStoreKeeperThunkСreator(fullName)).then((result) => {
            store.dispatch(thunkCreators.GetStoreKeeperThunkСreator(result.data.id)).then((result) => {
                let newArray = [{ ...result.data, isCreated: true }, ...storeKeepers];
                let newArrayWithoutRepeating = [...new Set(newArray.map(storeKeeper => storeKeeper.storeKeeperId))];
                for (let step = 0; step < newArray.length; step++) {
                    if (newArray[step].storeKeeperId !== newArrayWithoutRepeating[step]) {
                        newArray.splice(step, 1);
                        step--
                    }
                };
                setStoreKeepers(newArray);
                setIsLoaded(true);
            });
        }).catch(() => {
            setIsCreationFailed(true);
            setIsLoaded(true);
        });
    }
}

export default CreateNewElementPanel;