import { useState } from "react";
import removeImg from "../../resources/removeImage.png";
import store from "../../Store/store";
import * as thunkCreators from "../../Store/thunkCreators";
import TextLineModalWindow from "../CommonElements/TextLineModalWindow";
import { showScroll } from "../commonMethods";

function StoreKeeperListElement(props) {
    const [storeKeeper, setStoreKeeper] = useState(props.storeKeeper);
    const [isRemovingFailed, setIsRemovingFailed] = useState(false);

    return (<>
        {isRemovingFailed && <TextLineModalWindow text="Не удалось удалить запись" isLoaded={true}
            onClosing={() => { setIsRemovingFailed(false); showScroll(); }} />}
        {!storeKeeper.isRemoved &&
            <div className="StoreKeeperListElement ListElement"
                style={{ backgroundColor: props.storeKeeper.isCreated && "#ccf77752" }}>
                <b className="listElement storeKeeperId">{storeKeeper.storeKeeperId}</b>
                <b className="listElement storeKeeperFIO">{storeKeeper.fullName}</b>
                <b className="listElement storeKeeperDetailsCount">{storeKeeper.detailsCount}</b>
                <div className="listElement outOfRemoveImg">
                    {storeKeeper.detailsCount < 1 &&
                        <img src={removeImg} onClick={RemoveStoreKeeper(storeKeeper.storeKeeperId,
                            setStoreKeeper, props.setIsLoaded, setIsRemovingFailed)} alt="removeImg" className="removeImg" />}
                </div>
            </div>
        }</>
    );
}

function RemoveStoreKeeper(id, setStoreKeeper, setIsLoaded, setIsRemovingFailed) {
    return () => {
        setIsLoaded(false);
        store.dispatch(thunkCreators.RemoveStoreKeeperThunkСreator(id)).then(result => {
            setStoreKeeper({ isRemoved: true });
            setIsLoaded(true);
        }).catch(() => {
            setIsRemovingFailed(true);
            setIsLoaded(true);
        });
    }
}

export default StoreKeeperListElement;