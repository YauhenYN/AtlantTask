import { useState } from "react";
import removeImg from "../../resources/removeImage.png";
import store from "../../Store/store";
import * as thunkCreators from "../../Store/thunkCreators";

function StoreKeeperListElement(props) {
    const [storeKeeper, setStoreKeeper] = useState(props.storeKeeper);
    return (<>{!storeKeeper.isRemoved &&
            <div className="StoreKeeperListElement ListElement" style={{ backgroundColor: props.storeKeeper.isCreated && "#ccf77752" }}>
                <b className="listElement storeKeeperId">{storeKeeper.storeKeeperId}</b>
                <b className="listElement storeKeeperFIO">{storeKeeper.fullName}</b>
                <b className="listElement storeKeeperDetailsCount">{storeKeeper.detailsCount}</b>
                <div className="listElement outOfRemoveImg">
                    {storeKeeper.detailsCount < 1 &&
                        <img src={removeImg} onClick={RemoveStoreKeeper(storeKeeper.storeKeeperId, setStoreKeeper)} alt="removeImg" className="removeImg" />}
                </div>
            </div>
        }</>
    );
}

function RemoveStoreKeeper(id, setStoreKeeper) {
    return () => {
        store.dispatch(thunkCreators.RemoveStoreKeeperThunkСreator(id)).then(result => {
            setStoreKeeper({ isRemoved: true });
        });
    }
}

export default StoreKeeperListElement;