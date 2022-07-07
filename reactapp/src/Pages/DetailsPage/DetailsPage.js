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
        <CreateNewElementPanel details={details} setDetails={setDetails} />
        <div className="detailListElement">
            <b className="detailElement detailCode">Номен. код</b>
            <b className="detailElement detailName">Название</b>
            <b className="detailElement detailStoreKeeper">Кладовщик</b>
            <b className="detailElement detailCount">Количество</b>
            <b className="detailElement detailCreationDate">Дата создания</b>
            <b className="detailElement detailRemovingDate">Дата удаления</b>
            <div className="detailElement outOfRemoveImg"/>
        </div>
        {details.map(detail => <DetailListElement key={detail.detailId} detail={detail} />)}
        {pageNumber + 1 < pagesCount && <SmallButton text="···" onClick={GetManyDetails(details, setDetails, pageNumber, setPageNumber, setPagesCount)} />}
    </>);
}

function GetManyDetails(details, setDetails, pageNumber, setPageNumber, setPagesCount) {
    return () => {
        return store.dispatch(thunkCreators.GetManyDetailsThunkСreator(pageNumber + 1, listElementsCount)).then((result) => {
            setDetails([...details, ...result.data.elements]);
            setPagesCount(result.data.pagesCount);
            setPageNumber(pageNumber + 1);
        });
    }
}

export default DetailsPage;