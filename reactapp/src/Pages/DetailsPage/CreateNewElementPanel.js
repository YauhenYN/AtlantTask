import store from "../../Store/store";
import * as thunkCreators from "../../Store/thunkCreators";
import CreateNewElementButton from "../CommonElements/CreateNewElementButton";
import SmallButton from "../CommonElements/SmallButton";

function CreateNewElementPanel(props) {
    return (<>
        <SmallButton text = "Создать"/>
        <CreateNewElementButton onClick = {AddDetail}/>
        </>
    );
}

function AddDetail(nomenclatureCode, name, count, storeKeeperId, creationDate, details, setDetails) {
    return () => {
        store.dispatch(thunkCreators.AddDetailThunkСreator(nomenclatureCode, name, count, storeKeeperId, creationDate)).then((result) => {
            store.dispatch(thunkCreators.GetDetailThunkСreator(result.data.id)).then((result) => {
                setDetails([result.data, ...details]);
            });
        });
    }
}

export default CreateNewElementPanel;