import { useState } from "react";
import removeImg from "../../resources/removeImage.png";
import store from "../../Store/store";
import * as thunkCreators from "../../Store/thunkCreators";

function DetailListElement(props) {
    const [detail, setDetail] = useState(props.detail);
    return (<div className="ListElement" style = {{ backgroundColor: props.detail.isCreated && "#ccf77752"}}>
        <b className="listElement detailCode">{detail.nomenclatureCode}</b>
        <b className="listElement detailName">{detail.name}</b>
        <b className="listElement detailStoreKeeper">{detail.storeKeeperName}</b>
        <b className="listElement detailCount">{detail.count}</b>
        <b className="listElement detailCreationDate">{new Date(detail.creationDate + "Z").toLocaleString()}</b>
        {detail.removingDate ?
            <b className="listElement detailRemovingDate">
                {new Date(detail.removingDate + "Z").toLocaleString()}
            </b> :
            <b className="listElement detailRemovingDate" />}
        <div className="listElement outOfRemoveImg">
            {!detail.removingDate &&
                <img src={removeImg} onClick = {RemoveDetail(detail.detailId, setDetail)} alt="removeImg" className="removeImg" />}
        </div>
    </div>
    );
}

function RemoveDetail(id, setDetail){
    return () => {
        store.dispatch(thunkCreators.RemoveDetailThunkСreator(id)).then(result => {
            store.dispatch(thunkCreators.GetDetailThunkСreator(id)).then(result => {
                setDetail(result.data);
            })
        });
    }
}

export default DetailListElement;