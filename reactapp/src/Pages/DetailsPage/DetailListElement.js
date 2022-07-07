import { useState } from "react";
import removeImg from "./removeImage.png";
import store from "../../Store/store";
import * as thunkCreators from "../../Store/thunkCreators";

function DetailListElement(props) {
    const [detail, setDetail] = useState(props.detail);

    return (<div className="detailListElement">
        <b className="detailElement detailCode">{detail.nomenclatureCode}</b>
        <b className="detailElement detailName">{detail.name}</b>
        <b className="detailElement detailCount">{detail.count}</b>
        <b className="detailElement detailCreationDate">{new Date(detail.creationDate).toLocaleString()}</b>
        {detail.removingDate ?
            <b className="detailElement detailRemovingDate">
                {new Date(detail.removingDate).toLocaleString()}
            </b> :
            <b className="detailElement detailRemovingDate" />}
        <div className="detailElement outOfRemoveImg">
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