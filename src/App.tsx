import React, { useEffect } from 'react';
import Headers from '@/pages/Headers';
import './assets/scss/styles.css';
import Footer from '@/pages/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import routes from '@/configs/routes';
import { useAppDispatch } from './app/hooks';
import { authAction } from './app/action/auth.action';
import { useAuthStore } from './app/store';

function App() {
    const dispatch = useAppDispatch();
    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) dispatch(authAction.getUserByToken(token || ''));
    }, [dispatch]);

    const routesMap = routes.map((route, index) => {
        return <Route key={index} path={route.path} element={<route.component />}></Route>;
    });
    return (
        <Router>
            <div className="App">
                <Headers />
                <Routes>{routesMap}</Routes>
                {/* <div className="bg-light">
                    <div className="container">
                        <Footer />
                    </div>
                </div> */}
            </div>
        </Router>
    );
}

export default App;
