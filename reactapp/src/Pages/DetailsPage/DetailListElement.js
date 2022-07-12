import { useState } from "react";
import removeImg from "../../resources/removeImage.png";
import store from "../../Store/store";
import * as thunkCreators from "../../Store/thunkCreators";
import TextLineModalWindow from "../CommonElements/TextLineModalWindow";
import { showScroll } from "../commonMethods";

function DetailListElement(props) {
    const [detail, setDetail] = useState(props.detail);
    const [isRemovingFailed, setIsRemovingFailed] = useState(false);

    return (<>
        {isRemovingFailed && <TextLineModalWindow text="Не удалось удалить запись"
            onClosing={() => { setIsRemovingFailed(false); showScroll(); }} />}
        <div className="ListElement" style={{ backgroundColor: props.detail.isCreated && "#ccf77752" }}>
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
                    <img src={removeImg} onClick={RemoveDetail(detail.detailId, setDetail, props.setIsLoaded, setIsRemovingFailed)}
                        alt="removeImg" className="removeImg" />}
            </div>
        </div>
    </>
    );
}

function RemoveDetail(id, setDetail, setIsLoaded, setIsRemovingFailed) {
    return () => {
        setIsLoaded(false);
        store.dispatch(thunkCreators.RemoveDetailThunkСreator(id)).then(result => {
            return store.dispatch(thunkCreators.GetDetailThunkСreator(id)).then(result => {
                setDetail(result.data);
                setIsLoaded(true);
            });
        }).catch(() => {
            setIsRemovingFailed(true);
            setIsLoaded(true);
        });
    }
}

export default DetailListElement;