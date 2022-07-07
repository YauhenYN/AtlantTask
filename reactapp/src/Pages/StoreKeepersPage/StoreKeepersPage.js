import { useEffect, useState } from "react";
import store from "../../Store/store";
import * as thunkCreators from "../../Store/thunkCreators";
import { listElementsCount } from "../../configuration";

function StoreKeepersPage() {
    const [storeKeepers, setStoreKeepers] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [pagesCount, setPagesCount] = useState(0);

    useEffect(() => {
        async function dispatches() {
            await store.dispatch(thunkCreators.GetManyStoreKeepersThunkСreator(0, listElementsCount)).then((result) => {
                setStoreKeepers(result.data.elements);
                setPagesCount(result.data.pagesCount);
            });
        };
        dispatches();
    }, []);
    return (
        storeKeepers.map(storeKeeper => storeKeeper.storeKeeperId)
    );
  }
  
  export default StoreKeepersPage;