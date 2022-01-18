import Headers from './components/Headers';
import './assets/scss/styles.scss';

import Footer from './components/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import routes from './routes';

function App() {
    const routesMap = routes.map((route, index) => {
        return <Route key={index} path={route.path} element={<route.component />}></Route>;
    });
    return (
        <Router>
            <div className="App">
                <Headers />
                <Routes>{routesMap}</Routes>
                <div className="bg-light">
                    <div className="container">
                        <Footer />
                    </div>
                </div>
            </div>
        </Router>
    );
}

export default App;
