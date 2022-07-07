import { Routes, Route } from 'react-router-dom';
import DetailsPage from '../Pages/DetailsPage/DetailsPage';
import StoreKeepersPage from '../Pages/StoreKeepersPage/StoreKeepersPage';
import './App.css';
import { Link } from 'react-router-dom';

function App() {
    return (<>
        <div className="centerColumn bodyElement">
            <div className="commonButtonsPanel">
                <div className="commonButtons">
                    <Link to="/details">
                        <button className="commonButtonsButton" type="Button">Детали</button>
                    </Link>
                    <Link to="/storekeepers">
                        <button className="commonButtonsButton" type="Button">Кладовщики</button>
                    </Link>
                </div>
            </div>
            <Routes>
                <Route path="/details" element={<DetailsPage />} />
                <Route path="/storekeepers" element={<StoreKeepersPage />} />
            </Routes>
        </div>
        <div className="centerColumn">
            <footer>
                <b className="year">2022</b>
                <b className="bywho">By
                    <a className="href" href="https://www.linkedin.com/in/eyaroshevich/" rel="noopener noreferrer" target="_blank">
                        @eyaroshevich
                    </a>
                </b>
            </footer>
        </div>
    </>
    );
}

export default App;