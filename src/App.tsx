import React, { useEffect } from 'react';
import Headers from '@/pages/Headers';
import './assets/scss/styles.scss';
import Footer from '@/pages/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import routes from '@/configs/routes';
import { useAuthStore } from './app/store';
import { useAppDispatch } from './app/hooks';
import { authAction } from './app/action/auth.action';

function App() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(authAction.getUserByToken());
    }, [dispatch]);
    
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
