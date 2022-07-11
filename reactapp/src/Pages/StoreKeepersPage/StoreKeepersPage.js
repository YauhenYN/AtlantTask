import { useEffect, useState } from "react";
import store from "../../Store/store";
import * as thunkCreators from "../../Store/thunkCreators";
import { listElementsCount } from "../../configuration";
import SmallButton from "../CommonElements/SmallButton";
import StoreKeeperListElement from "./StoreKeeperListElement";
import CreateNewElementPanel from "./CreateNewElementPanel";
import "./StoreKeepersPage.css";
import Loading from "../CommonElements/Loading";

function StoreKeepersPage() {
    const [storeKeepers, setStoreKeepers] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [pagesCount, setPagesCount] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        async function dispatches() {
            await GetManyStoreKeepers(storeKeepers, setStoreKeepers, -1, setPageNumber, setPagesCount, setIsLoaded)();
        };
        dispatches();
    }, []);
    return (<>
        <Loading isLoaded = {isLoaded}/>
        <div className="StoreKeeperListElement ListElement">
            <b className="listElement storeKeeperId">ID</b>
            <b className="listElement storeKeeperFIO">ФИО</b>
            <b className="listElement storeKeeperDetailsCount">Количество деталей</b>
            <div className="listElement outOfRemoveImg" />
        </div>
        <CreateNewElementPanel storeKeepers={storeKeepers} setStoreKeepers={setStoreKeepers} setIsLoaded = {setIsLoaded}/>
        {storeKeepers.map(storeKeeper => <StoreKeeperListElement key={storeKeeper.storeKeeperId} storeKeeper={storeKeeper} setIsLoaded = {setIsLoaded}/>)}
        {pageNumber + 1 < pagesCount && <SmallButton text="···" onClick={GetManyStoreKeepers(storeKeepers, setStoreKeepers, pageNumber, setPageNumber, setPagesCount, setIsLoaded)} />}
    </>);
}

function GetManyStoreKeepers(storeKeepers, setStoreKeepers, pageNumber, setPageNumber, setPagesCount, setIsLoaded) {
    return () => {
        setIsLoaded(false);
        return store.dispatch(thunkCreators.GetManyStoreKeepersThunkСreator(pageNumber + 1, listElementsCount)).then((result) => {
            let newArray = [...storeKeepers, ...result.data.elements];
            let newArrayWithoutRepeating = [...new Set(newArray.map(storeKeeper => storeKeeper.storeKeeperId))];
            for (let step = 0; step < newArray.length; step++) {
                if (newArray[step].storeKeeperId !== newArrayWithoutRepeating[step]) {
                    newArray.splice(step, 1);
                    step--;
                }
            };
            setStoreKeepers(newArray);
            setPagesCount(result.data.pagesCount);
            setPageNumber(pageNumber + 1);
            setIsLoaded(true);
        });
    }
}

export default StoreKeepersPage;