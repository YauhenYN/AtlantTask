import { useEffect, useState } from "react";
import store from "../../Store/store";
import * as thunkCreators from "../../Store/thunkCreators";
import { listElementsCount } from "../../configuration";
import SmallButton from "../CommonElements/SmallButton";
import DetailListElement from "./DetailListElement";
import CreateNewElementPanel from "./CreateNewElementPanel";
import "./DetailsPage.css";

function DetailsPage() {
    const [details, setDetails] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [pagesCount, setPagesCount] = useState(0);

    useEffect(() => {
        async function dispatches() {
            await GetManyDetails(details, setDetails, -1, setPageNumber, setPagesCount)();
        };
        dispatches();
    }, []);
    return (<>
        <div className="ListElement">
            <b className="listElement detailCode">Номен. код</b>
            <b className="listElement detailName">Название</b>
            <b className="listElement detailStoreKeeper">Кладовщик</b>
            <b className="listElement detailCount">Количество</b>
            <b className="listElement detailCreationDate">Дата создания</b>
            <b className="listElement detailRemovingDate">Дата удаления</b>
            <div className="listElement outOfRemoveImg"/>
        </div>
        <CreateNewElementPanel details={details} setDetails={setDetails} />
        {details.map(detail => <DetailListElement key={detail.detailId} detail={detail} />)}
        {pageNumber + 1 < pagesCount && <SmallButton text="···" onClick={GetManyDetails(details, setDetails, pageNumber, setPageNumber, setPagesCount)} />}
    </>);
}

function GetManyDetails(details, setDetails, pageNumber, setPageNumber, setPagesCount) {
    return () => {
        return store.dispatch(thunkCreators.GetManyDetailsThunkСreator(pageNumber + 1, listElementsCount)).then((result) => {
            let newArray = [...details, ...result.data.elements];
            let newArrayWithoutRepeating = [...new Set(newArray.map(detail => detail.detailId))];
            for(let step = 0; step < newArray.length; step++){
                if(newArray[step].detailId !== newArrayWithoutRepeating[step]) {
                    newArray.splice(step, 1);
                    step--;
                }
            };
            setDetails(newArray);
            setPagesCount(result.data.pagesCount);
            setPageNumber(pageNumber + 1);
        });
    }
}

export default DetailsPage;