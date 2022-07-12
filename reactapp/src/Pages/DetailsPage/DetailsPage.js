import { useEffect, useState } from "react";
import store from "../../Store/store";
import * as thunkCreators from "../../Store/thunkCreators";
import { listElementsCount } from "../../configuration";
import SmallButton from "../CommonElements/SmallButton";
import DetailListElement from "./DetailListElement";
import CreateNewElementPanel from "./CreateNewElementPanel";
import "./DetailsPage.css";
import Loading from "../CommonElements/Loading";
import TextLineModalWindow from "../CommonElements/TextLineModalWindow";
import { showScroll } from "../commonMethods";

function DetailsPage() {
    const [details, setDetails] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [pagesCount, setPagesCount] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isLoadingFailed, setIsLoadingFailed] = useState(false);
    const [isServerFailed, setIsServerFailed] = useState(false);

    useEffect(() => {
        async function dispatches() {
            await GetManyDetails(details, setDetails, -1, setPageNumber,
                setPagesCount, setIsLoaded, setIsLoadingFailed, setIsServerFailed)();
        };
        dispatches();
    }, []);
    return (<>
        <Loading isLoaded={isLoaded} />
        {isLoadingFailed && <TextLineModalWindow text="Не удалось загрузить детали"
            onClosing={() => { setIsLoadingFailed(false); showScroll(); }} />}
        {isServerFailed && <TextLineModalWindow text="Не удалось связаться с сервером"
            onClosing={() => { setIsServerFailed(false); showScroll(); }} />}
        <div className="ListElement">
            <b className="listElement detailCode">Номен. код</b>
            <b className="listElement detailName">Название</b>
            <b className="listElement detailStoreKeeper">Кладовщик</b>
            <b className="listElement detailCount">Количество</b>
            <b className="listElement detailCreationDate">Дата создания</b>
            <b className="listElement detailRemovingDate">Дата удаления</b>
            <div className="listElement outOfRemoveImg" />
        </div>
        <CreateNewElementPanel details={details} setDetails={setDetails} setIsLoaded={setIsLoaded} />
        {details.map(detail => <DetailListElement key={detail.detailId} detail={detail} setIsLoaded={setIsLoaded} />)}
        {pageNumber + 1 < pagesCount && <SmallButton text="···"
            onClick={GetManyDetails(details, setDetails, pageNumber,
                setPageNumber, setPagesCount, setIsLoaded, setIsLoadingFailed, setIsServerFailed)} />}
    </>);
}

function GetManyDetails(details, setDetails, pageNumber, setPageNumber, setPagesCount, setIsLoaded, setFailed, setIsServerFailed) {
    return () => {
        setIsLoaded(false);
        return store.dispatch(thunkCreators.GetManyDetailsThunkСreator(pageNumber + 1, listElementsCount)).then((result) => {
            let newArray = [...details, ...result.data.elements];
            let newArrayWithoutRepeating = [...new Set(newArray.map(detail => detail.detailId))];
            for (let step = 0; step < newArray.length; step++) {
                if (newArray[step].detailId !== newArrayWithoutRepeating[step]) {
                    newArray.splice(step, 1);
                    step--;
                }
            };
            setDetails(newArray);
            setPagesCount(result.data.pagesCount);
            setPageNumber(pageNumber + 1);
            setIsLoaded(true);
        }).catch((error) => {
            error.code === 'ERR_NETWORK' ? setIsServerFailed(true) : setFailed(true);
            setIsLoaded(true);
        });
    }
}

export default DetailsPage;